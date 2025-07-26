import { Customer, LoadBoard, LoadRow, Route, Shipment } from "@/type";

export function mapLoadToRow(load: LoadBoard): LoadRow {
  const customer = load.customer as Customer;
  const route = load.route as Route;
  const shipment = load.shipment as Shipment;

  return {
    load_id: load.load_id,
    customer: {
        companyName: customer.companyName,
        contactPerson: customer.contactPerson,
        contactPhone: customer.contactPhone,
    },
    origin: route?.origin ?? "",
    pickupTime: route?.pickupTime ?? "",
    pickupDate: route?.pickupDate ?? "",
    miles: "", // Chưa có dữ liệu, tính sau
    destination: route?.destination ?? "",
    deliveryTime: route?.deliveryTime ?? "",
    deliveryDate: route?.deliveryDate ?? "",
    equipment: shipment?.equipmentType ?? "",
    weight: shipment?.weight?.toString() ?? "0",
    rate: shipment?.rate?.toString() ?? "0",
    rateUnit: shipment?.rateUnit ?? "USD",
    stop: route?.additionalStop ?? "",
    status: load.status ?? "posted",
    createdAt: load.createdAt?.toString() || new Date().toISOString(),
  };
}
