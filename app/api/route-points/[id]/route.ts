import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Route from "@/models/load_board/Routes";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const { status } = await req.json();

  try {
    const updated = await Route.updateOne(
      { "pickupPoint._id": id },
      { $set: { "pickupPoint.status": status } }
    );

    if (updated.modifiedCount === 0) {
      const stopUpdate = await Route.updateOne(
        { "stopPoints._id": id },
        { $set: { "stopPoints.$.status": status } }
      );

      if (stopUpdate.modifiedCount === 0) {
        await Route.updateOne(
          { "deliveryPoint._id": id },
          { $set: { "deliveryPoint.status": status } }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
