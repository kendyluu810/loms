import dbConnect from "@/lib/mongodb";
import Load from "@/models/load_board/Load";
import Driver from "@/models/Driver";
import Routes from "@/models/load_board/Routes";
import Shipment from "@/models/load_board/Shipment";
import Vehicle from "@/models/Vehicle";
import "@/models/load_board/Routes";
import "@/models/load_board/Shipment";
import "@/models/customer/Customers";
import "@/models/Carrier";
import "@/models/Invoice";
import "@/models/Driver";
import "@/models/Vehicle";
import "@/models/employees/Employees";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { updateLoadStatusBasedOnPoints } from "@/lib/updateLoadStatusBasedOnPoints";

/**
 * Handles GET requests for loading a board by its ID.
 *
 * This function retrieves a load document from the database using either a MongoDB ObjectId or a custom `load_id`.
 * It populates related fields such as route, shipment, customer, driver, dispatcher, vehicle, carrier, and invoice.
 * If the load is found, it processes the `route` and `shipment` objects to add a `points` array, which includes
 * pickup, stop, and delivery points with their respective types.
 *
 * @param req - The incoming Next.js request object.
 * @param context - An object containing route parameters, including the load `id`.
 * @returns A JSON response containing the load data with populated fields and processed points,
 *          or an error message with the appropriate HTTP status code.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();

  try {
    const load = mongoose.Types.ObjectId.isValid(id)
      ? await Load.findById(id)
      : await Load.findOne({ load_id: id })
          .populate("route")
          .populate("shipment")
          .populate("customer")
          .populate("driver")
          .populate("dispatcher")
          .populate("vehicle")
          .populate("carrier")
          .populate("invoice");

    //console.log("ROUTE DATA:", load);

    if (!load) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const route = load.route;
    if (route) {
      const points = [
        { ...(route.pickupPoint?.toObject?.() ?? {}), type: "pickup" },
        ...(route.stopPoints ?? []).map((stop: unknown) => ({
          ...(stop &&
          typeof stop === "object" &&
          "toObject" in stop &&
          typeof stop.toObject === "function"
            ? stop.toObject()
            : {}),
          type: "stop",
        })),
        { ...(route.deliveryPoint?.toObject?.() ?? {}), type: "delivery" },
      ];
      route.points = points;
    }

    const shipment = load.shipment;
    if (shipment) {
      const shipmentPoints = [
        { ...(shipment.pickupPoint?.toObject?.() ?? {}), type: "pickup" },
        ...(shipment.stopPoint
          ? [{ ...(shipment.stopPoint?.toObject?.() ?? {}), type: "stop" }]
          : []),
        { ...(shipment.deliveryPoint?.toObject?.() ?? {}), type: "delivery" },
      ];
      shipment.points = shipmentPoints;
    }
    return NextResponse.json(load);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

/**
 * Handles the PUT request to update a Load entity and its related Route, Shipment, and Customer data.
 * 
 * This function performs the following operations:
 * - Connects to the database.
 * - Retrieves the Load by its ID or load_id, including its associated Route.
 * - Updates the Route if route data is provided in the request body.
 *   - Fetches the updated Route after modification to ensure correct data.
 *   - Recalculates the overall status of the Load based on the statuses of pickup, delivery, and stop points.
 *   - Updates the Load's status if it has changed.
 * - Updates the Shipment if shipment data is provided in the request body.
 * - Updates the Customer if customer data is provided in the request body.
 * - Retrieves the updated Load with populated references for route, shipment, carrier, and customer.
 * - Calls a helper function to update the Load status based on its points.
 * - Returns the updated Load as a JSON response.
 * 
 * All Vietnamese comments in the function have been translated to English.
 * 
 * @param req - The incoming Next.js request object.
 * @param context - The context object containing route parameters.
 * @returns A JSON response with the updated Load or an error message.
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const body = await req.json();

  try {
    const load = mongoose.Types.ObjectId.isValid(id)
      ? await Load.findById(id)
      : await Load.findOne({ load_id: id }).populate("route");
    if (!load || !load.route) {
      return NextResponse.json(
        { message: "Load or Route not found" },
        { status: 404 }
      );
    }
    // === Update Route ===
    if (body.route && load.route) {
      const existingRoute = load.route.toObject();

      await Routes.findByIdAndUpdate(
        existingRoute._id,
        {
          $set: {
            ...existingRoute,
            ...body.route,
          },
        },
        { new: false } 
      );

      // Fetch the updated route after updating (must fetch again to get correct data)
      const updatedRoute = await Routes.findById(existingRoute._id);

      // Recalculate the overall status of the Load
      const statuses: string[] = [
        updatedRoute?.pickupPoint?.status,
        updatedRoute?.deliveryPoint?.status,
        ...(updatedRoute?.stopPoints || []).map(
          (pt: { status: string }) => pt.status
        ),
      ]
        .filter(Boolean)
        .map((s) => s.toLowerCase());

      let newStatus = load.status;

      if (statuses.includes("cancelled")) {
        newStatus = "cancelled";
      } else if (statuses.every((s) => s === "completed")) {
        newStatus = "completed";
      } else if (statuses.includes("in progress")) {
        newStatus = "in progress";
      } else if (load.status === "posted") {
        newStatus = "booked";
      }

      // Cập nhật nếu thay đổi
      if (load.status !== newStatus) {
        load.status = newStatus;
        await load.save();
      }
    }

    // === Update Shipment ===
    if (body.shipment && load.shipment) {
      await Shipment.findByIdAndUpdate(
        load.shipment._id ?? load.shipment,
        {
          $set: {
            ...body.shipment,
          },
        },
        { new: true }
      );
    }

    // === Update Customer ===
    if (body.customer) {
      load.customer = body.customer;
      await load.save();
    }

    const updatedLoad = await Load.findOne({ load_id: id })
      .populate("route")
      .populate({
        path: "shipment",
        populate: [
          { path: "pickupPoint" },
          { path: "deliveryPoint" },
          { path: "stopPoint" },
        ],
      })
      .populate("carrier")
      .populate("customer");

    if (updatedLoad?._id) {
      await updateLoadStatusBasedOnPoints(updatedLoad._id);
    }

    return NextResponse.json(updatedLoad, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

/**
 * Handles DELETE requests to remove a load entry from the database by its identifier.
 *
 * This function connects to the database, attempts to find a load by its MongoDB ObjectId or by a custom `load_id` field,
 * and deletes it if found. Returns a JSON response indicating success or failure.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing route parameters, specifically the `id` of the load to delete.
 * @returns A Next.js JSON response with a success or error message and appropriate HTTP status code.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    const load = mongoose.Types.ObjectId.isValid(id)
      ? await Load.findById(id) 
      : await Load.findOne({ load_id: id });
    if (!load) {
      return NextResponse.json({ message: "Load not found" }, { status: 404 });
    }
    await Load.deleteOne({ _id: load._id });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}

/**
 * Handles PATCH requests to update a load's route or confirm a booking.
 *
 * This function supports two main operations:
 * 1. If the request body contains a `route` object, it updates the route's pickup, delivery, and stop points,
 *    then updates the overall load status based on the new route points.
 * 2. Otherwise, it treats the request as a booking confirmation, validating required fields, updating the load
 *    with driver, dispatcher, vehicle, pickup ETA, and pickup time, and marks the vehicle as not empty.
 *    It also updates the load status based on the route points.
 *
 * Returns appropriate JSON responses for success or error cases.
 *
 * @param req - The incoming Next.js request object.
 * @param context - The context object containing route parameters, including the load ID.
 * @returns A NextResponse with the result of the update or booking confirmation.
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  console.log("=== PATCH /api/load_board/[id] called ===");
  try {
    await dbConnect();

    const loadId = (await context.params).id;

    const body = await req.json();
    console.log("PATCH body:", body);
    console.log("Booking body:", body);

    // === CASE 1: Only update Route status or points in the route ===
    if (body.route) {
      const load = await Load.findOne({ load_id: loadId }).populate("route");
      if (!load || !load.route) {
        return NextResponse.json(
          { message: "Load or Route not found" },
          { status: 404 }
        );
      }

      const routeId = load.route._id;

      const updatedRoute = await Routes.findByIdAndUpdate(
        routeId,
        {
          pickupPoint: body.route.pickupPoint,
          deliveryPoint: body.route.deliveryPoint,
          stopPoints: body.route.stopPoints,
        },
        { new: true }
      );

      // After updating the route, automatically update the overall status
      await updateLoadStatusBasedOnPoints(loadId);

      return NextResponse.json({
        message: "Route updated",
        route: updatedRoute,
      });
        }
        // Booking Form
        const { driver, dispatcher, vehicle, pickupETA, pickupTime } = body;

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

        if (!pickupETA?.includes(":") || !pickupTime?.includes(":")) {
      return NextResponse.json(
        { message: "pickupETA or pickupTime format invalid" },
        { status: 400 }
      );
        }

        const load = await Load.findOne({ load_id: loadId }).populate("route");
        if (!load || !load.route || !load.route.pickupPoint) {
      return NextResponse.json(
        { message: "Load or pickupPoint not found" },
        { status: 404 }
      );
        }

        const pickupDate = new Date(load.route.pickupPoint.date);
        const [etaHours, etaMinutes] = pickupETA.split(":").map(Number);
        const [timeHours, timeMinutes] = pickupTime.split(":").map(Number);

        const pickupETADate = new Date(pickupDate);
        pickupETADate.setHours(etaHours, etaMinutes, 0, 0);

        const pickupTimeDate = new Date(pickupDate);
        pickupTimeDate.setHours(timeHours, timeMinutes, 0, 0);

        const driverDoc = await Driver.findOne({ employee: driver });
        if (!driverDoc) {
      return NextResponse.json(
        { message: "Driver not found" },
        { status: 404 }
      );
        }

        const updatedLoad = await Load.findOneAndUpdate(
      { load_id: loadId },
      {
        driver: driverDoc._id,
        dispatcher: new mongoose.Types.ObjectId(dispatcher),
        vehicle: new mongoose.Types.ObjectId(vehicle),
        pickupETA: pickupETADate,
        pickupTime: pickupTimeDate,
        status: "booked",
      },
      { new: true }
        );

        if (!updatedLoad) {
      return NextResponse.json({ message: "Load not found" }, { status: 404 });
        }

        await Vehicle.findByIdAndUpdate(vehicle, { isEmpty: false });

        // Update the overall load status based on route points
        try {
      await updateLoadStatusBasedOnPoints(loadId);
        } catch (err) {
      console.error("Error updating load status:", err);
        }

        return NextResponse.json({
      message: "Booking confirmed",
      load: {
        _id: updatedLoad._id,
        load_id: updatedLoad.load_id,
        status: updatedLoad.status,
      },
        });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Confirm Booking Error:", error);
      return NextResponse.json(
        { message: "Failed to confirm booking", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Failed to confirm booking", error: "Unknown error" },
      { status: 500 }
    );
  }
}
