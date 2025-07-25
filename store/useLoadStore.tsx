import { Customer, Route, Shipment } from "@/type";
import { create } from "zustand";

interface LoadState {
  route: Partial<Route>;
  shipment: Partial<Shipment>;
  owner: Partial<Customer>;
  updateRoute: (route: Partial<Route>) => void;
  updateShipment: (shipment: Partial<Shipment>) => void;
  updateOwner: (owner: Partial<Customer>) => void;
  reset: () => void;
}

export const useLoadStore = create<LoadState>((set, get) => ({
  route: {},
  shipment: {},
  owner: {
    customerType: "Shipper", // Default value
  },
  updateRoute: (route) =>
    set((state) => ({
      route: { ...state.route, ...route },
    })),
  updateShipment: (shipment) =>
    set((state) => ({
      shipment: { ...state.shipment, ...shipment },
    })),
  updateOwner: (owner) =>
    set((state) => ({
      owner: { ...state.owner, ...owner },
    })),
  reset: () =>
    set({
      route: {},
      shipment: {},
      owner: {
        customerType: "Shipper", // Reset to default value
      },
    }),
}));
