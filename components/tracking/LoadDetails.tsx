import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export default function LoadDetails({ load }: any) {
  if (!load) return null;

  const driver = load.driver;
  const employee = driver?.employee;

  return (
    <div className="border hfu rounded-xl p-4 shadow-md overflow-y-auto">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="driver">Driver</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <p>
            <strong>Equipment:</strong> {load.shipment?.equipmentType}
          </p>
          <p>
            <strong>Weight:</strong> {load.shipment?.weight}
          </p>
          <p>
            <strong>Rate:</strong> {load.shipment?.rate}
          </p>
        </TabsContent>
        <TabsContent value="driver">
          <p>
            <strong>Name:</strong> {employee?.fullName}
          </p>
          <p>
            <strong>License:</strong> {driver?.driverlicense} (
            {driver?.licensetype})
          </p>
          <p>
            <strong>Vehicle:</strong> {driver?.vehicleType} -{" "}
            {driver?.vehicleNumber}
          </p>
        </TabsContent>
        <TabsContent value="customer">
          <p>
            <strong>Customer:</strong> {load.customer?.name}
          </p>
          <p>
            <strong>Contact:</strong> {load.customer?.contactName} (
            {load.customer?.contactPhone})
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
