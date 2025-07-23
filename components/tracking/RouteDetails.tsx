export default function RouteDetails({ load }: any) {
  if (!load) return <div className="p-4">No load selected</div>;

  return (
    <div className="border rounded-xl p-4 shadow-md h-[85vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Route Details</h2>
      <p>
        <strong>Origin:</strong> {load.route?.origin}
      </p>
      <p>
        <strong>Pickup:</strong> {load.route?.pickupDate}{" "}
        {load.route?.pickupTime}
      </p>
      <p>
        <strong>Destination:</strong> {load.route?.destination}
      </p>
      <p>
        <strong>Delivery:</strong> {load.route?.deliveryDate}{" "}
        {load.route?.deliveryTime}
      </p>
      <p>
        <strong>Miles:</strong> {load.miles}
      </p>
      <p>
        <strong>Stops:</strong>{" "}
        {Array.isArray(load.route?.stops)
          ? load.route.stops.join(", ")
          : "No stops available"}
      </p>
    </div>
  );
}
