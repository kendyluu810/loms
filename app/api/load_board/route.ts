import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Route from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";
import Customer from "@/models/customer/Customers";
import Carrier from "@/models/Carrier";
import Vehicle from "@/models/Vehicle";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate if route, shipment, and customer exist
    const { route, shipment, customer: customerId, carrier, status } = body;

    const [foundRoute, foundShipment, foundCustomer, foundCarrier] =
      await Promise.all([
        Route.findById(route),
        Shipment.findById(shipment),
        Customer.findById(customerId),
        Carrier.findById(carrier),
      ]);

    if (!foundRoute || !foundShipment || !foundCustomer || !foundCarrier) {
      return NextResponse.json(
        { message: "Route, Shipment, Customer, or Carrier not found" },
        { status: 404 }
      );
    }

    if (
      !foundRoute.pickupPoint ||
      !foundRoute.deliveryPoint ||
      !foundRoute.stopPoints
    ) {
      foundRoute.pickupPoint = {
        type: "pickup",
        locationName: foundRoute.origin || "",
        cityState: foundRoute.origin || "",
        address: foundRoute.pickupAddress || "",
        timezone: "UTC+7",
        date: foundRoute.pickupDate?.toISOString() || "",
        localTime: foundRoute.pickupTime || "",
        early: foundRoute.shipperSchedule?.from || "",
        late: foundRoute.shipperSchedule?.to || "",
        status: "pending",
        eta: "",
      };

      foundRoute.deliveryPoint = {
        type: "delivery",
        locationName: foundRoute.destination || "",
        cityState: foundRoute.destination || "",
        address: foundRoute.deliveryAddress || "",
        timezone: "UTC+7",
        date: foundRoute.deliveryDate?.toISOString() || "",
        localTime: foundRoute.deliveryTime || "",
        early: foundRoute.receiverSchedule?.from || "",
        late: foundRoute.receiverSchedule?.to || "",
        status: "pending",
        eta: "",
      };

      foundRoute.stopPoints = {
        type: "stop",
        locationName: foundRoute.additionalStop || "",
        cityState: "",
        address: "N/A",
        timezone: "UTC+7",
        date: foundRoute.date || "",
        localTime: foundRoute.time || "",
        status: "planned",
        eta: "",
      };

      await foundRoute.save();
    }

    if (
      !foundShipment.pickupPoint ||
      !foundShipment.deliveryPoint ||
      !foundShipment.stopPoint
    ) {
      foundShipment.pickupPoint = {
        type: "pickup",
        code: foundShipment.pickupNumber || "AUTO",
        locationName: foundRoute.origin || "",
        eta: foundRoute.pickupDate?.toISOString() || "",
        status: "pending",
      };

      foundShipment.deliveryPoint = {
        type: "delivery",
        code: foundShipment.deliveryNumber || "AUTO",
        locationName: foundRoute.destination || "",
        eta: foundRoute.deliveryDate?.toISOString() || "",
        status: "pending",
      };

      foundShipment.stopPoint = {
        type: "stop",
        code: foundShipment.warehouseNumber || "AUTO",
        locationName: foundRoute.additionalStop || "",
        eta: foundRoute.date?.toISOString() || "",
        status: "planned",
      };

      await foundShipment.save();
    }

    const newLoad = await Load.create({
      route: foundRoute._id,
      shipment: foundShipment._id,
      customer: foundCustomer._id,
      carrier: foundCarrier._id,
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

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { loadId, driver, dispatcher, vehicle, pickupETA, pickupTime } = body;

    const today = new Date();

    const [etaHours, etaMinutes] = pickupETA.split(":").map(Number);
    const [timeHours, timeMinutes] = pickupTime.split(":").map(Number);

    const pickupETADate = new Date(today);
    pickupETADate.setHours(etaHours, etaMinutes, 0, 0);

    const pickupTimeDate = new Date(today);
    pickupTimeDate.setHours(timeHours, timeMinutes, 0, 0);
    
    if (
      !loadId ||
      !driver ||
      !dispatcher ||
      !vehicle ||
      !pickupETA ||
      !pickupTime
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedLoad = await Load.findByIdAndUpdate(
      loadId,
      {
        driver,
        dispatcher,
        vehicle,
        pickupETA: pickupETADate.toISOString(),
        pickupTime: pickupTimeDate.toISOString(),
        status: "in_transit",
      },
      { new: true }
    );

    if (!updatedLoad) {
      return NextResponse.json({ message: "Load not found" }, { status: 404 });
    }

    await Vehicle.findByIdAndUpdate(vehicle, { isEmpty: false });

    return NextResponse.json({
      message: "Booking confirmed",
      load: updatedLoad,
    });
  } catch (error: any) {
    console.error("Confirm Booking Error:", error);
    return NextResponse.json(
      { message: "Failed to confirm booking", error: error.message },
      { status: 500 }
    );
  }
}
