import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Route from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";
import Customer from "@/models/customer/Customers";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate if route, shipment, and customer exist
    const { route, shipment, customer: customerId, status } = body;

    const [foundRoute, foundShipment, foundCustomer] = await Promise.all([
      Route.findById(route),
      Shipment.findById(shipment),
      Customer.findById(customerId),
    ]);

    const newLoad = await Load.create({
      route: foundRoute._id,
      shipment: foundShipment._id,
      customer: foundCustomer._id,
      status: status || "posted",
    });

    return NextResponse.json(newLoad, { status: 201 });
  } catch (error: any) {
    console.error("Create Load error:", error);
    return NextResponse.json(
      { message: "Failed to create Load", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const filter: any = {};
    if (search) {
      filter.load_id = { $regex: search, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const filters: any = {};

    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const additionalStops = searchParams.get("additionalStops");
    const stateFrom = searchParams.get("stateFrom");
    const stateTo = searchParams.get("stateTo");
    const stop = searchParams.get("stop");
    const equipmentType = searchParams.get("equipmentType");
    const radius = searchParams.get("radius");
    const pickupFrom = searchParams.get("pickupFrom");
    const pickupTo = searchParams.get("pickupTo");
    const rate = searchParams.get("rate");
    const ratePerMile = searchParams.get("ratePerMile");
    const customerType = searchParams.get("customerType");
    const companyName = searchParams.get("companyName");
    const contactPerson = searchParams.get("contactPerson");
    const minWeight = searchParams.get("minWeight");
    const maxWeight = searchParams.get("maxWeight");
    const miles = searchParams.get("miles");
    const minMiles = searchParams.get("minMiles");
    const createdAt = searchParams.get("createdAt");

    const loads = await Load.find()
      .populate("route")
      .populate("shipment")
      .populate("customer")
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Load.countDocuments(filter);

    const filtered = loads.filter((load: any) => {
      const { route, shipment, customer } = load;
      if (origin && route?.origin !== origin) return false;
      if (destination && route?.destination !== destination) return false;
      if (additionalStops && route?.additionalStops !== additionalStops)
        return false;
      if (stateFrom && route?.stateFrom !== stateFrom) return false;
      if (stateTo && route?.stateTo !== stateTo) return false;
      if (stop && route?.stop !== stop) return false;
      if (equipmentType && shipment?.equipmentType !== equipmentType)
        return false;
      if (radius && route?.radius !== radius) return false;
      // pickupDate filters
      const pickupDate = new Date(route?.pickupDate);
      if (pickupFrom && pickupDate < new Date(pickupFrom)) return false;
      if (pickupTo && pickupDate > new Date(pickupTo)) return false;
      //Miles filters
      const mile = parseFloat(route?.miles || "0");
      if (minMiles && mile < parseFloat(minMiles)) return false;
      if (miles && mile > parseFloat(miles)) return false;
      if (rate && shipment?.rate < parseFloat(rate)) return false;
      if (ratePerMile && shipment?.ratePerMile < parseFloat(ratePerMile))
        return false;
      if (customerType && customer?.customerType !== customerType) return false;
      if (companyName && customer?.companyName !== companyName) return false;
      if (contactPerson && customer?.contactPerson !== contactPerson)
        return false;
      const weight = parseFloat(shipment?.weight || "0");
      if (minWeight && weight < parseFloat(minWeight)) return false;
      if (maxWeight && weight > parseFloat(maxWeight)) return false;
      if (createdAt) {
        const createdDate = new Date(load.createdAt);
        if (createdDate.toISOString().split("T")[0] !== createdAt) return false;
      }
      return true;
    });

    return NextResponse.json({ data: filtered, total, page }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch loads", details: error },
      { status: 500 }
    );
  }
}
