import { LoadFormValues } from "@/lib/schemas/fullSchema";
import { create } from "zustand";

type WithId<T> = Partial<T> & { _id?: string };

type PartialLoadFormValues = {
  route: WithId<LoadFormValues["route"]>;
  shipment: WithId<LoadFormValues["shipment"]>;
  customer: WithId<LoadFormValues["customer"]>;
};

interface LoadState extends PartialLoadFormValues {
  updateRoute: (route: WithId<LoadFormValues["route"]>) => void;
  updateShipment: (shipment: WithId<LoadFormValues["shipment"]>) => void;
  updateCustomer: (customer: WithId<LoadFormValues["customer"]>) => void;
  reset: () => void;
}

export const useLoadStore = create<LoadState>((set) => ({
  route: {},
  shipment: {},
  customer: {
    customerType: "Shipper", // default
  },

  updateRoute: (route) =>
    set((state) => ({
      route: { ...state.route, ...route },
    })),

  updateShipment: (shipment) =>
    set((state) => ({
      shipment: { ...state.shipment, ...shipment },
    })),

  updateCustomer: (customer) =>
    set((state) => ({
      customer: { ...state.customer, ...customer },
    })),

  reset: () =>
    set({
      route: {},
      shipment: {},
      customer: {
        customerType: "Shipper", // reset default
      },
    }),
}));
