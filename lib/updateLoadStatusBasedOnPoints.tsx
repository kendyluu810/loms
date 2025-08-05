import Load from "@/models/load_board/Load";
export async function updateLoadStatusBasedOnPoints(loadId: string) {
  const load = await Load.findOne({ load_id: loadId }).populate("route");

  if (!load || !load.route) return;

  const { pickupPoint, stopPoints, deliveryPoint } = load.route;

  const statuses: string[] = [
    pickupPoint?.status,
    ...(Array.isArray(stopPoints) ? stopPoints.map((s) => s?.status) : []),
    deliveryPoint?.status,
  ]
    .filter(Boolean)
    .map((s) => s.toLowerCase());

  if (statuses.length === 0) return;

  let newStatus = load.status;

  if (statuses.includes("cancelled")) {
    newStatus = "cancelled";
  } else if (statuses.every((s) => s === "completed")) {
    newStatus = "delivered";
  } else if (statuses.includes("in progress")) {
    newStatus = "in_progress";
  } else if (load.status === "posted") {
    newStatus = "booked";
  }

  console.log("Statuses from route:", statuses);
  console.log("Current load.status:", load.status);
  console.log("New calculated status:", newStatus);

  if (load.status !== newStatus) {
    load.status = newStatus;
    await load.save();
  }
}
