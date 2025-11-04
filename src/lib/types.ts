// For our "Recent Shipments" table
export interface Shipment {
  id: string;
  status: "Pending" | "In Transit" | "Delivered" | "Failed";
  destination: string;
  palletCount: number;
  lastUpdate: string;
}

// For our main KPI cards
export interface KpiCardData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ElementType; // We'll pass Lucide icons
}

// For our Inventory Data Table
export type PalletStatus = "In Warehouse" | "Loading" | "Damaged" | "Shipped";

export interface Pallet {
  id: string; // e.g., "PLT-001"
  contents: string; // e.g., "Electronics"
  origin: string; // e.g., "Supplier A"
  destination: string; // e.g., "Dock 4"
  status: PalletStatus;
  weight: number; // in lbs
  created: string; // ISO date string
}

// For our Customers Data Table
export type CustomerTier = "Standard" | "Premium" | "VIP";

export interface Customer {
  id: string; // e.g., "CUST-001"
  companyName: string; // e.g., "Apex Logistics"
  contactName: string; // e.g., "Sarah Chen"
  email: string;
  phone: string;
  tier: CustomerTier;
  joinedDate: string; // ISO date string
}
