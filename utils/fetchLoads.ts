import { Load } from "@/type";

function formatDate(dateStr?: string) {
  return dateStr ? dateStr.slice(0, 10) : "";
}

function formatTime(timeStr?: string) {
  return timeStr ? timeStr.slice(11, 16) : "";
}

//calculate age from createdAt timestamp
function calculateAge(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();

  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (hours === 0 && minutes === 0) return "Just now";
  if (hours === 0) return `${minutes}m ago`;
  return `${hours}h ${minutes}m ago`;
}

export async function fetchLoads(): Promise<Load[]> {
  const res = await fetch("/api/load_board");

  if (!res.ok) {
    throw new Error("Failed to fetch load data");
  }

  const rawData = await res.json();

  const formatted: Load[] = rawData.map((item: any) => ({
    loadNumber: item.loadNumber || item._id,
    age: calculateAge(item.createdAt),
    customer: item.customer?.name || "Unknown",
    contact: `${item.customer?.contactName} (${item.customer?.contactPhone})`,
    origin: item.route?.origin || "",
    pickupTime: formatTime(item.route?.pickupTime),
    pickupDate: formatDate(item.route?.pickupDate),
    miles: item.miles + "mi",
    destination: item.route?.destination || "",
    deliveryTime: formatTime(item.route?.deliveryTime),
    deliveryDate: formatDate(item.route?.deliveryDate),
    equipment: item.shipment?.equipmentType || "",
    weight: item.shipment?.weight ? `${item.shipment.weight} lbs` : "N/A",
    rate: item.shipment?.rate || "",
    rateUnit: item.shipment?.rateUnit || "USD",
    stop: item.stop || "",
    status: item.status || "Posted",
  }));

  return formatted;
}
