import { create } from "zustand";

interface ShipmentOptionsState {
  itemCategories: string[];
  equipmentTypes: string[];
  truckLoads: string[];
  dangerTypes: string[];
  fetchOptions: () => void;
  addItemCategory: (value: string) => void;
  removeItemCategory: (value: string) => void;

  addEquipmentType: (value: string) => void;
  removeEquipmentType: (value: string) => void;

  addTruckLoad: (value: string) => void;
  removeTruckLoad: (value: string) => void;
  
  addDangerType: (value: string) => void;
  removeDangerType: (value: string) => void;
}

export const useShipmentOptions = create<ShipmentOptionsState>((set) => ({
  itemCategories: [],
  equipmentTypes: [],
  truckLoads: [],
  dangerTypes: [],

  fetchOptions: async () => {
    const [cat, eq, truck, danger] = await Promise.all([
      fetch("/api/item-categories").then((res) => res.json()),
      fetch("/api/equipmentType").then((res) => res.json()),
      fetch("/api/TruckLoad").then((res) => res.json()),
      fetch("/api/DangerType").then((res) => res.json()),
    ]);

    set({
      itemCategories: cat.map((c: any) => c.name),
      equipmentTypes: eq.map((e: any) => e.name),
      truckLoads: truck.map((t: any) => t.name),
      dangerTypes: danger.map((d: any) => d.name),
    });
  },

  addItemCategory: async (item) => {
    const res = await fetch("/api/item-categories", {
      method: "POST",
      body: JSON.stringify({ name: item }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      await useShipmentOptions.getState().fetchOptions();
    }
  },

  removeItemCategory: async (item) => {
    const res = await fetch("/api/item-categories", {
      method: "DELETE",
      body: JSON.stringify({ name: item }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      useShipmentOptions.getState().fetchOptions();
    }
  },

  addEquipmentType: async (item) => {
    const res = await fetch("/api/equipmentType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.ok) {
     await useShipmentOptions.getState().fetchOptions();
    }
  },

  removeEquipmentType: async (item) => {
    const res = await fetch("/api/equipmentType", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.ok) {
      await useShipmentOptions.getState().fetchOptions();
    }
  },

  addTruckLoad: async (item) => {
    const res = await fetch("/api/TruckLoad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.ok) {
      await useShipmentOptions.getState().fetchOptions();
    }
  },

  removeTruckLoad: async (item) => {
    const res = await fetch("/api/TruckLoad", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.ok) {
      await useShipmentOptions.getState().fetchOptions();
    }
  },

  addDangerType: async (item) => {
    const res = await fetch("/api/DangerType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.ok) {
    await useShipmentOptions.getState().fetchOptions();
    }
  },

  removeDangerType: async (item) => {
    const res = await fetch("/api/DangerType", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.ok) {
      await useShipmentOptions.getState().fetchOptions();
    }
  },
}));
