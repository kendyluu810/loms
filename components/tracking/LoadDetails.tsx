import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
interface LoadDetailsProps {
  load: {
    load_id: string;
    shipment?: {
      equipmentType?: string;
      weight?: string;
      rate?: string;
      rateUnit?: string;
    };
    route?: {
      pickupPoint?: {
        address?: string;
      };
      pickupTime?: string;
      deliveryPoint?: {
        address?: string;
      };
      deliveryTime?: string;
    };
    driver?: {
      driverlicense?: string;
      licensetype?: string;
      employee?: {
        name?: string;
      };
    };
    vehicle?: {
      truckNumber?: string;
      trailerNumber?: string;
    };
    customer?: {
      companyName?: string;
      contactPerson?: string;
      contactPhone?: string;
    };
  };
}

export default function LoadDetails({ load }: LoadDetailsProps) {
  if (!load) return null;

  const driver = load.driver;
  const employee = driver?.employee;
  const shipment = load.shipment;
  const customer = load.customer;
  const vehicle = load.vehicle;
  const route = load.route;

  return (
    <div className="border h-fit bg-white rounded-xl p-4 shadow-md overflow-y-auto">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="driver">Driver</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <div className="space-y-1">
            <p>
              <strong>Load ID:</strong> {load.load_id}
            </p>
            <p>
              <strong>Equipment:</strong> {shipment?.equipmentType}
            </p>
            <p>
              <strong>Weight:</strong> {shipment?.weight}
            </p>
            <p>
              <strong>Rate:</strong> {shipment?.rate}{" "}
              {shipment?.rateUnit || "N/A"}
            </p>
          </div>
          <hr />
          <div className="space-y-1">
            <p>
              <strong>Pickup:</strong> {route?.pickupPoint?.address || "N/A"} at{" "}
              {route?.pickupTime || "N/A"}
            </p>
            <p>
              <strong>Delivery:</strong>{" "}
              {route?.deliveryPoint?.address || "N/A"} at{" "}
              {route?.deliveryTime || "N/A"}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="driver">
          <p>
            <strong>Name:</strong> {employee?.name || "N/A"}
          </p>
          <p>
            <strong>License:</strong> {driver?.driverlicense} (
            {driver?.licensetype})
          </p>
          <p>
            <strong>Vehicle:</strong>
            {vehicle?.truckNumber || "N/A"} - {vehicle?.trailerNumber || "N/A"}
          </p>
        </TabsContent>
        <TabsContent value="customer">
          <p>
            <strong>Customer:</strong> {customer?.companyName || "N/A"}
          </p>
          <p>
            <strong>Contact:</strong> {customer?.contactPerson || "N/A"} (
            {customer?.contactPhone || "N/A"})
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
