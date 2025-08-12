import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import RoutePoint from "@/models/load_board/RoutePoint";
import Load from "@/models/load_board/Load";

/**
 * Handles PATCH requests to update the status of a RoutePoint by its ID.
 *
 * - Connects to the database.
 * - Extracts the RoutePoint ID from the request parameters and the new status from the request body.
 * - Updates the RoutePoint's status in the database.
 * - If the RoutePoint is associated with a Load (`load_id` exists), synchronizes the Load's status based on the RoutePoint's type and new status:
 *   - If the point type is "pickup" and the new status is "in_progress" or "completed", updates the Load's status to "in_progress".
 *   - If the point type is "delivery" and the new status is "delivered", updates the Load's status to "delivered".
 * - Returns a JSON response with the updated RoutePoint or an error message if not found or if an error occurs.
 *
 * @param req - The incoming Next.js request object.
 * @param params - An object containing the RoutePoint ID as a promise.
 * @returns A JSON response with the update result or an error message.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  try {
    // Update RoutePoint
    const point = await RoutePoint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!point) {
      return NextResponse.json(
        { error: "RoutePoint not found" },
        { status: 404 }
      );
    }

    // If there is a loadId → synchronize Load
    const loadId = point.load_id?.toString(); // Ensure loadId exists and is a string
    if (loadId) {
      if (
        point.pointType === "pickup" &&
        ["in_progress", "completed"].includes(status)
      ) {
        await Load.findByIdAndUpdate(loadId, { status: "in_progress" });
      }

      if (point.pointType === "delivery" && status === "delivered") {
        await Load.findByIdAndUpdate(loadId, { status: "delivered" });
      }
    }

    return NextResponse.json(
      { message: "RoutePoint updated", point },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH RoutePoint error:", error);
    return NextResponse.json(
      { error: "Failed to update RoutePoint" },
      { status: 500 }
    );
  }
}
