import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TrackingPage() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 p-4 space-y-4 border-r">
        {/* Search and Filters */}
        <div className="flex items-center space-x-2">
          <Input placeholder="Search" />
          <Button variant="outline">+ Add Filters</Button>
        </div>

        {/* Available Tracking List */}
        <h2 className="text-lg font-semibold">Available Tracking</h2>
        <div className="space-y-2 overflow-y-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 underline cursor-pointer">
                  #951159739
                </span>
                <Badge variant="secondary">In Delivery</Badge>
              </div>
              <div className="text-sm mt-2">
                <div>Pickup: Hanover, Virginia</div>
                <div>Delivery: Joliet, Illinois</div>
                <div>Responsible: John Doe</div>
              </div>
            </CardContent>
          </Card>
          {/* Repeat Card for other tracking items */}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Route Details</h2>
          <Button variant="destructive">Close Map</Button>
        </div>

        {/* Route Steps */}
        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          {/* Example Route Step */}
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">✓</Badge>
            <div>
              <div className="font-medium">Truck Assigned</div>
              <div className="text-sm text-gray-500">
                Hanover, Virginia - 14 May 08:30 PM
              </div>
            </div>
          </div>
          {/* Repeat for each route step */}
        </div>
        {/* Tabs for General, Driver, Customer, Chat, Documents */}
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="driver">Driver</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow">
              <div>
                <div className="text-sm text-gray-500">Last Stop</div>
                <div>Hanover, Virginia</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Next Stop</div>
                <div>Fort Wayne, Indiana</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Distance</div>
                <div>746 miles</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Distance to Delivery
                </div>
                <div>374 miles</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Speed</div>
                <div>76 mph</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="driver">Driver Details here</TabsContent>
          <TabsContent value="customer">Customer Details here</TabsContent>
          <TabsContent value="chat">Chat here</TabsContent>
          <TabsContent value="documents">Documents here</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
