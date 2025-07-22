import { Customer, RouteData, ShipmentData } from "@/type";
import { create } from "zustand";

interface LoadState {
  route: RouteData;
  shipment: ShipmentData;
  owner: Customer;
  updateRoute: (route: Partial<RouteData>) => void;
  updateShipment: (shipment: Partial<ShipmentData>) => void;
  updateOwner: (owner: Partial<Customer>) => void;
  reset: () => void;
}

export const useLoadStore = create<LoadState>((set, get) => ({
  route: {},
  shipment: {},
  owner: {
    deliveryMethod: "Air"
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
        deliveryMethod: "Air"
      },
    }),
}));
