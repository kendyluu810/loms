import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Route from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";
import Customer from "@/models/customer/Customers";
import Carrier from "@/models/Carrier";
import Vehicle from "@/models/Vehicle";
import Employees from "@/models/employees/Employees";
import "@/models/Driver";
import "@/models/Invoice";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate if route, shipment, and customer exist
    const { route, shipment, customer: customerId, carrier } = body;

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
        timezone: "GMT+7",
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
        timezone: "GMT+7",
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
        timezone: "GMT+7",
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

    const {
      driver: driverId,
      vehicle: vehicleId,
      dispatcher: dispatcherId,
    } = body;

    const [foundDriver, foundDispatcher, foundVehicle] = await Promise.all([
      driverId ? Employees.findById(driverId) : null,
      dispatcherId ? Employees.findById(dispatcherId) : null,
      vehicleId ? Vehicle.findById(vehicleId) : null,
    ]);

    if (driverId && !foundDriver) {
      return NextResponse.json(
        { message: "Driver not found" },
        { status: 404 }
      );
    }
    if (dispatcherId && !foundDispatcher) {
      return NextResponse.json(
        { message: "Dispatcher not found" },
        { status: 404 }
      );
    }
    if (vehicleId && !foundVehicle) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    const newLoad = await Load.create({
      route: foundRoute._id,
      shipment: foundShipment._id,
      customer: foundCustomer._id,
      carrier: foundCarrier._id,
      driver: foundDriver?._id || undefined,
      vehicle: foundVehicle?._id || undefined,
      dispatcher: foundDispatcher?._id || undefined,
      status: "posted",
    });

    return NextResponse.json(newLoad, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to create Load", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
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

    const filter:  Record<string, unknown> = {};
    if (search) {
      filter.load_id = { $regex: search, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const loads = await Load.find(filter)
      .populate("route")
      .populate("shipment")
      .populate("customer")
      .populate("carrier")
      .populate({
        path: "driver",
        populate: {
          path: "employee",
          model: "Employee", // RẤT QUAN TRỌNG!
        },
      })
      .populate("dispatcher")
      .populate("vehicle")
      .populate("invoice")
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    //console.log("LOAD SAMPLE:", loads[0].driver);

    const total = await Load.countDocuments(filter);

    return NextResponse.json({ data: loads, total, page }, { status: 200 });
    // //console.log("driver full info", loads[0].driver);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch loads", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
