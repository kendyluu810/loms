"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { ExtendedLoadRow } from "@/type";

interface Invoice {
  _id: string;
  loadRate: string;
  fuelSurchargeCustomer: string;
  carrierRate: string;
  fuelSurchargeCarrier: string;
  ratePerMile: string;
  miles: string;
  fuelSurcharge: string;
  fuelRate: string;
  customerChargesTotal?: number;
  carrierChargesTotal?: number;
  carrierTotal?: number;
  invoiceTotal?: number;
  adjustedAmount?: number;
  carrierTotalPay?: number;
  [key: string]: string | number | undefined; // fallback for dynamic fields like `loadRate`, etc.
}

interface InvoiceTabsProps {
  load: ExtendedLoadRow;
}

export default function InvoiceTabs({ load }: InvoiceTabsProps) {
  const [editCustomer, setEditCustomer] = useState(false);
  const [editCarrier, setEditCarrier] = useState(false);
  const [editAdjustment, setEditAdjustment] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const params = useParams();

  const load_id = params?.id as string;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`/api/load_board/${load_id}`);
        let currentInvoice = res.data.invoice;

        if (!currentInvoice) {
          const newInvoiceRes = await axios.post(`/api/invoice`, {
            loadId: load_id,
          });
          currentInvoice = newInvoiceRes.data;

          // Attach the new invoice to the Load
          await axios.put(`/api/load_board/${load_id}/invoice`, {
            invoiceId: currentInvoice._id,
          });
          toast.success("Invoice created successfully!");
        }

        const loadRate = parseFloat(currentInvoice.loadRate) || 0;
        const fuelSurchargeCustomer =
          parseFloat(currentInvoice.fuelSurchargeCustomer) || 0;
        const carrierRate = parseFloat(currentInvoice.carrierRate) || 0;
        const fuelSurchargeCarrier =
          parseFloat(currentInvoice.fuelSurchargeCarrier) || 0;

        const rate = parseFloat(currentInvoice.ratePerMile) || 0;
        const miles = parseFloat(currentInvoice.miles) || 0;
        const fuel = parseFloat(currentInvoice.fuelSurcharge) || 0;

        const customerChargesTotal = loadRate + fuelSurchargeCustomer;
        const carrierChargesTotal = carrierRate + fuelSurchargeCarrier;
        const carrierTotal = rate * miles;
        const invoiceTotal = carrierTotal + fuel;
        const adjustedAmount = invoiceTotal - carrierTotal;
        const carrierTotalPay =
          customerChargesTotal + carrierChargesTotal + adjustedAmount;
          if (!currentInvoice) {
            // Create a new invoice if not exists
            const newInvoiceRes = await axios.post(`/api/invoice`, {
              loadId: load_id,
            });
            currentInvoice = newInvoiceRes.data;
            // Attach to Load
            await axios.put(`/api/load_board/${load_id}/invoice`, {
              invoiceId: currentInvoice._id,
            });
            toast.success("Invoice created successfully!");
          }

        setInvoice({
          ...currentInvoice,
          customerChargesTotal: parseFloat(customerChargesTotal.toFixed(2)),
          carrierChargesTotal: parseFloat(carrierChargesTotal.toFixed(2)),
          carrierTotal: parseFloat(carrierTotal.toFixed(2)),
          invoiceTotal: parseFloat(invoiceTotal.toFixed(2)),
          adjustedAmount: parseFloat(adjustedAmount.toFixed(2)),
          carrierTotalPay: parseFloat(carrierTotalPay.toFixed(2)),
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(`Unable to load invoice: ${err.message}`);
        } else {
          toast.error("Unable to load invoice: Unknown error");
        }
      }
    };

    if (load_id) {
      fetchInvoice();
    }
  }, [load_id]);

  const updateInvoiceField = async (field: string, value: string | number) => {
    if (!invoice?._id) return;

    try {
      const res = await axios.put(`/api/invoice/${invoice._id}`, {
        [field]: value,
      });

      const updated = res.data;

      const newCarrierTotal =
        Number(updated.ratePerMile || 0) * Number(updated.miles || 0);
      const newInvoiceTotal =
        newCarrierTotal + Number(updated.fuelSurcharge || 0);

      setInvoice({
        ...updated,

        carrierTotal: parseFloat(newCarrierTotal.toFixed(2)),
        invoiceTotal: parseFloat(newInvoiceTotal.toFixed(2)),
      });

      toast.success("Update successful");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Update failed: ${err.message}`);
      } else {
        toast.error("Update failed: Unknown error");
      }
    }
  };
  const calculateTotals = (currentInvoice: Invoice) => {
    const loadRate = parseFloat(currentInvoice.loadRate) || 0;
    const fuelSurchargeCustomer =
      parseFloat(currentInvoice.fuelSurchargeCustomer) || 0;
    const carrierRate = parseFloat(currentInvoice.carrierRate) || 0;
    const fuelSurchargeCarrier =
      parseFloat(currentInvoice.fuelSurchargeCarrier) || 0;

    const rate = parseFloat(currentInvoice.ratePerMile) || 0;
    const miles = parseFloat(currentInvoice.miles) || 0;
    const fuel = parseFloat(currentInvoice.fuelSurcharge) || 0;

    const customerChargesTotal = loadRate + fuelSurchargeCustomer;
    const carrierChargesTotal = carrierRate + fuelSurchargeCarrier;
    const carrierTotal = rate * miles;
    const invoiceTotal = carrierTotal + fuel;
    const adjustedAmount = invoiceTotal - carrierTotal;
    const carrierTotalPay =
      customerChargesTotal + carrierChargesTotal + adjustedAmount;

    return {
      customerChargesTotal: parseFloat(customerChargesTotal.toFixed(2)),
      carrierChargesTotal: parseFloat(carrierChargesTotal.toFixed(2)),
      carrierTotal: parseFloat(carrierTotal.toFixed(2)),
      invoiceTotal: parseFloat(invoiceTotal.toFixed(2)),
      adjustedAmount: parseFloat(adjustedAmount.toFixed(2)),
      carrierTotalPay: parseFloat(carrierTotalPay.toFixed(2)),
    };
  };

  useEffect(() => {
    if (!invoice) return;

    const totals = calculateTotals(invoice);
    setInvoice((prev) => (prev ? { ...prev, ...totals } : prev));
  }, [
    invoice?.ratePerMile,
    invoice?.miles,
    invoice?.fuelSurcharge,
    invoice?.loadRate,
    invoice?.fuelSurchargeCustomer,
    invoice?.carrierRate,
    invoice?.fuelSurchargeCarrier,
  ]);

  const renderInput = (label: string, field: string, editable: boolean) => (
    <div>
      <Label>{label}</Label>
      <Input
        value={invoice?.[field] || ""}
        disabled={!editable}
        onChange={(e) => {
          const newValue = e.target.value;
          setInvoice((prev) => (prev ? { ...prev, [field]: newValue } : prev));
        }}
        onBlur={() => updateInvoiceField(field, invoice?.[field] || "")}
      />
    </div>
  );

  if (!invoice) return <div>Loading invoice...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Customer & Carrier Charges */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Customer Charges</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditCustomer((prev) => !prev)}
            >
              <Pencil className="w-4 h-4 mr-1" />
              {editCustomer ? "Done" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderInput("Load Rate", "loadRate", editCustomer)}
            {renderInput(
              "Fuel Surcharge",
              "fuelSurchargeCustomer",
              editCustomer
            )}
            <div className="font-bold pt-2 border-t">
              Total: ${invoice.customerChargesTotal || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Carrier Charges</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditCarrier((prev) => !prev)}
            >
              <Pencil className="w-4 h-4 mr-1" />
              {editCarrier ? "Done" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderInput("Carrier Rate", "carrierRate", editCarrier)}
            {renderInput("Fuel Surcharge", "fuelSurchargeCarrier", editCarrier)}
            <div className="font-bold pt-2 border-t">
              Total: ${invoice.carrierChargesTotal || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle: Invoice Adjustment */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Invoice Adjustment</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditAdjustment((prev) => !prev)}
            >
              <Pencil className="w-4 h-4 mr-1" />
              {editAdjustment ? "Done" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderInput("Rate Per Mile", "ratePerMile", editAdjustment)}
            {renderInput("Miles", "miles", editAdjustment)}
            {renderInput("Fuel Rate", "fuelRate", editAdjustment)}
            {renderInput("Fuel Surcharge", "fuelSurcharge", editAdjustment)}
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Carrier Total</span>
                <span>${invoice.carrierTotal || 0}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Invoice Total</span>
                <span>${invoice.invoiceTotal || 0}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Adjustment Amount</span>
                <span>${invoice.adjustedAmount || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Invoice Final */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Invoice Final</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Customer Charges</span>
              <span>${invoice.customerChargesTotal || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Carrier Charges</span>
              <span>${invoice.carrierChargesTotal || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Adjusted</span>
              <span>${invoice.adjustedAmount || 0}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total Carrier Pay</span>
              <span>${invoice.carrierTotalPay || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
