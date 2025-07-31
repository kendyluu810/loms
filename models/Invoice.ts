import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  loadId: mongoose.Types.ObjectId;
  CustomerId: mongoose.Types.ObjectId;
  carrierId: mongoose.Types.ObjectId;

  loadRate: number;
  fuelSurchargeCustomer: number;
  customerChargesTotal: number;

  carrierRate: number;
  fuelSurchargeCarrier: number;
  carrierChargesTotal: number;

  ratePerMile: number;
  miles: number;
  fuelRate: number;
  fuelSurcharge: number;

  invoiceTotal: number;
  carrierTotal: number;
  adjustedAmount?: number;
  carrierTotalPay?: number;
  remarks?: string;

  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema: Schema = new Schema(
  {
    loadId: { type: Schema.Types.ObjectId, ref: "Load", required: true },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    carrierId: { type: Schema.Types.ObjectId, ref: "Carrier", required: true },

    loadRate: { type: Number, default: 0 },
    fuelSurchargeCustomer: { type: Number, default: 0 },
    customerChargesTotal: { type: Number, default: 0 },

    carrierRate: { type: Number, default: 0 },
    fuelSurchargeCarrier: { type: Number, default: 0 },
    carrierChargesTotal: { type: Number, default: 0 },

    ratePerMile: { type: Number, default: 0 },
    miles: { type: Number, default: 0 },
    fuelRate: { type: Number, default: 0 },
    fuelSurcharge: { type: Number, default: 0 },

    invoiceTotal: { type: Number, default: 0 },
    carrierTotal: { type: Number, default: 0 },
    adjustedAmount: { type: Number, default: 0 },
    carrierTotalPay: { type: Number, default: 0 },
    remarks: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model<IInvoice>("Invoice", InvoiceSchema);
