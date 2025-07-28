"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash } from "lucide-react";

export default function InvoiceTabs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        {/* CUSTOMER */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-blue-900">Customer</CardTitle>
            <div className="space-x-2">
              <Button size="icon" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Linehaul inc Fuel</span>
              <span>$3,500</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Fuel $0.700 × 746 Miles</span>
              <span></span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>$3,500</span>
            </div>
          </CardContent>
        </Card>

        {/* CARRIER */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-blue-900">Carrier</CardTitle>
            <div className="space-x-2">
              <Button size="icon" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Linehaul</span>
              <span>$3,500</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Fuel $0.680 × 746 Miles</span>
              <span></span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>$3,500</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* INVOICE ADJUSTMENT */}
      <Card className="col-span-1">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-blue-900">Invoice Adjustment</CardTitle>
          <Button size="icon" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between font-semibold">
            <span>Invoice Total</span>
            <span>$3,500</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input defaultValue="2,992.72" placeholder="Linehaul" />
            <Button size="icon" variant="ghost">
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input defaultValue="507.28" placeholder="Fuel" />
            <Button size="icon" variant="ghost">
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input defaultValue="4.69" placeholder="Rate Per Mile" />
            <Input defaultValue="0" placeholder="Detention" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input defaultValue="746" placeholder="Total Miles" />
            <Input placeholder="Driver Incentive" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input defaultValue="0.68" placeholder="Fuel Surcharge" />
            <div></div>
          </div>
          <Button size="sm" className="mt-2 w-full" variant="outline">
            + Add Payments
          </Button>
        </CardContent>
      </Card>

      {/* INVOICE FINAL */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-blue-900">Invoice Final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Linehaul</span>
            <span>$2,992.72</span>
          </div>
          <div className="flex justify-between">
            <span>Fuel</span>
            <span>$507.28</span>
          </div>
          <div className="flex justify-between">
            <span>Detention</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between">
            <span>Driver Incentive</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total Carrier Pay</span>
            <span>$3,500</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
