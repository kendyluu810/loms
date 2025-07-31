import { LoadFormValues } from "@/lib/schemas/fullSchema";
import { create } from "zustand";

type WithId<T> = Partial<T> & { _id?: string };

type PartialLoadFormValues = {
  route: WithId<LoadFormValues["route"]>;
  shipment: WithId<LoadFormValues["shipment"]>;
  customer: WithId<LoadFormValues["customer"]>;
  carrier: WithId<LoadFormValues["carrier"]>;
};

interface LoadState extends PartialLoadFormValues {
  updateRoute: (route: WithId<LoadFormValues["route"]>) => void;
  updateShipment: (shipment: WithId<LoadFormValues["shipment"]>) => void;
  updateCustomer: (customer: WithId<LoadFormValues["customer"]>) => void;
  updateCarrier: (carrier: WithId<LoadFormValues["carrier"]>) => void;
  reset: () => void;
}
export const useLoadStore = create<LoadState>((set) => ({
  route: {},
  shipment: {},
  customer: {
    customerType: "Shipper", // default
  },
  carrier: {},

  updateRoute: (route) =>
    set((state) => {
      const {
        origin,
        destination,
        pickupDate,
        deliveryDate,
        pickupTime,
        deliveryTime,
      } = route;

      const pickupPoint = origin
        ? {
            type: "pickup" as const,
            timezone: "Asia/Ho_Chi_Minh",
            localTime: pickupTime || "",
            early: "",
            late: "",
            date: pickupDate?.toISOString() || "",
            locationName: origin,
            cityState: origin,
            address: route.pickupAddress || "",
            status: "Pending",
            eta: "",
          }
        : undefined;

      const deliveryPoint = destination
        ? {
            type: "delivery" as const,
            timezone: "Asia/Ho_Chi_Minh",
            localTime: deliveryTime || "",
            early: "",
            late: "",
            date: deliveryDate?.toISOString() || "",
            locationName: destination,
            cityState: destination,
            address: route.deliveryAddress || "",
            status: "Pending",
            eta: "",
          }
        : undefined;

      return {
        route: {
          ...state.route,
          ...route,
          pickupPoint,
          deliveryPoint,
        },
      };
    }),

  updateShipment: (shipment) =>
    set((state) => {
      const pickupPoint = {
        type: "pickup" as const,
        code: "AUTO",
        locationName: state.route.origin || "",
        eta: state.route.pickupDate?.toISOString() || "",
        status: "Pending",
      };
      const deliveryPoint = {
        type: "delivery" as const,
        code: "AUTO",
        locationName: state.route.destination || "",
        eta: state.route.deliveryDate?.toISOString() || "",
        status: "Pending",
      };

      return {
        shipment: {
          ...state.shipment,
          ...shipment,
          pickupPoint,
          deliveryPoint,
        },
      };
    }),

  updateCustomer: (customer) =>
    set((state) => ({
      customer: { ...state.customer, ...customer },
    })),

  updateCarrier: (carrier) =>
    set((state) => ({
      carrier: { ...state.carrier, ...carrier },
    })),
    
  reset: () =>
    set({
      route: {},
      shipment: {},
      customer: {
        customerType: "Shipper", // reset default
      },
      carrier: {},
    }),
}));
