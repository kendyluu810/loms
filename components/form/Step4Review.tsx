import { EllipsisVertical, SquarePen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Step4Review() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      {/* Route */}
      <Card className="space-y-4 border p-4 rounded-lg shadow-sm">
        <div className="">
          <CardHeader className="space-y-2">
            <CardTitle>Route</CardTitle>
          </CardHeader>

          <div className="flex items-center mt-3">
            <div className="flex-1/3">
              <CardContent className="space-y-2">
                <div>
                  Origin:
                  <span>s</span>
                </div>
                <div>
                  Pickup Number:
                  <span>s</span>
                </div>
                <div>
                  Shipper Schedule:
                  <span>s</span>{" "}
                </div>
                <div>
                  Pickup Date:
                  <span>s</span>
                </div>
                <div>
                  Pickup Time:
                  <span>s</span>{" "}
                </div>
              </CardContent>
            </div>
            <div className="flex-1/3">
              <CardContent className="space-y-2">
                <div>
                  Destination:
                  <span>s</span>{" "}
                </div>
                <div>
                  Delivery Number:
                  <span>s</span>{" "}
                </div>
                <div>
                  Receiver Schedule:
                  <span>s</span>{" "}
                </div>
                <div>
                  Delivery Date:
                  <span>s</span>{" "}
                </div>
                <div>
                  Delivery Time:
                  <span>s</span>{" "}
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Additional Stop</CardTitle>
        </CardHeader>
        <div className="flex items-center mt-3">
          <div className="flex-1/3">
            <CardContent className="space-y-2">
              <div>
                Origin:
                <span>s</span>{" "}
              </div>
              <div>
                Warehouse Number:
                <span>s</span>{" "}
              </div>
              <div>
                Warehouse Schedule:
                <span>s</span>
              </div>
            </CardContent>
          </div>
          <div className="flex-1/3">
            <CardContent className="space-y-2">
              <div>
                Destination:
                <span>s</span>{" "}
              </div>
              <div>
                {" "}
                Date:
                <span>s</span>{" "}
              </div>
              <div>
                {" "}
                Time:
                <span>s</span>{" "}
              </div>
            </CardContent>{" "}
          </div>
        </div>
      </Card>
      {/* Shipment */}
      <Card>
        <CardHeader>
          <CardTitle>Shipment Details</CardTitle>
        </CardHeader>
        <div className="flex items-center mt-3">
          <div className="flex-1/3">
            <CardContent className="space-y-2">
              <div>
                Item Category:
                <span>s</span>{" "}
              </div>
              <div>
                Equipment Type:
                <span>s</span>{" "}
              </div>
              <div>
                Truck Load:
                <span>s</span>{" "}
              </div>
              <div>
                Dangerous Goods:
                <span>s</span>{" "}
              </div>
            </CardContent>
          </div>
          <div className="flex-1/3">
            <CardContent className="space-y-2">
              <div>
                Weight:
                <span>s</span>{" "}
              </div>
              <div>
                Length:
                <span>s</span>{" "}
              </div>
              <div>
                Rate:
                <span>s</span>{" "}
              </div>
              <div>
                Danger Type:
                <span>s</span>{" "}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Owner */}
      <Card>
        <CardHeader>
          <CardTitle>Owner Information</CardTitle>
        </CardHeader>
        <div className="flex items-center mt-3">
          <div className="flex-1/3">
            <CardContent className="space-y-2">
              <div>
                Customer:
                <span>s</span>{" "}
              </div>
              <div>
                Company Email
                <span>s</span>:{" "}
              </div>
              <div>
                Company Phone:
                <span>s</span>{" "}
              </div>
            </CardContent>
          </div>
          <div className="flex-1/3">
            <CardContent className="space-y-2">
              <div>
                Contact Person:
                <span>s</span>{" "}
              </div>
              <div>
                Contact Email:
                <span>s</span>{" "}
              </div>
              <div>
                Contact Phone:
                <span>s</span>{" "}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
