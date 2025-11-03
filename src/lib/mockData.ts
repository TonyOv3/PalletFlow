import { KpiCardData, Shipment, Pallet } from "./types";
import { Truck, Warehouse, AlertTriangle, CheckCircle2 } from "lucide-react";

export const kpiData: KpiCardData[] = [
  {
    title: "Total Shipments",
    value: "1,423",
    change: "+12.5%",
    changeType: "positive",
    icon: Truck,
  },
  {
    title: "Pallets in Warehouse",
    value: "8,940",
    change: "-2.1%",
    changeType: "negative",
    icon: Warehouse,
  },
  {
    title: "Deliveries Today",
    value: "68",
    change: "+5.3%",
    changeType: "positive",
    icon: CheckCircle2,
  },
  {
    title: "Damaged Goods",
    value: "4",
    change: "+1",
    changeType: "negative",
    icon: AlertTriangle,
  },
];

export const recentShipments: Shipment[] = [
  {
    id: "SHP-8841",
    status: "In Transit",
    destination: "Chicago, IL",
    palletCount: 120,
    lastUpdate: "2m ago",
  },
  {
    id: "SHP-8840",
    status: "Delivered",
    destination: "New York, NY",
    palletCount: 85,
    lastUpdate: "3h ago",
  },
  {
    id: "SHP-8839",
    status: "Pending",
    destination: "Miami, FL",
    palletCount: 200,
    lastUpdate: "5h ago",
  },
  {
    id: "SHP-8838",
    status: "Failed",
    destination: "Los Angeles, CA",
    palletCount: 50,
    lastUpdate: "1d ago",
  },
  {
    id: "SHP-8837",
    status: "Delivered",
    destination: "Seattle, WA",
    palletCount: 75,
    lastUpdate: "1d ago",
  },
];

export const palletData: Pallet[] = [
  { id: "PLT-001", contents: "Electronics", origin: "Supplier A", destination: "Dock 4", status: "In Warehouse", weight: 1200, created: "2025-11-03T10:30:00Z" },
  { id: "PLT-002", contents: "Apparel", origin: "Supplier B", destination: "Rack 2B", status: "In Warehouse", weight: 800, created: "2025-11-03T09:15:00Z" },
  { id: "PLT-003", contents: "Groceries", origin: "Supplier C", destination: "Cold-Stow-1", status: "Loading", weight: 1500, created: "2025-11-03T08:00:00Z" },
  { id: "PLT-004", contents: "Auto Parts", origin: "Supplier A", destination: "Dock 1", status: "Shipped", weight: 2000, created: "2025-11-02T17:00:00Z" },
  { id: "PLT-005", contents: "Pharmaceuticals", origin: "Supplier D", destination: "Pharma-Bay", status: "In Warehouse", weight: 500, created: "2025-11-02T16:30:00Z" },
  { id: "PLT-006", contents: "Electronics", origin: "Supplier A", destination: "QA-Hold", status: "Damaged", weight: 1100, created: "2025-11-02T14:20:00Z" },
  { id: "PLT-007", contents: "Apparel", origin: "Supplier B", destination: "Rack 5A", status: "In Warehouse", weight: 900, created: "2025-11-01T11:00:00Z" },
  { id: "PLT-008", contents: "Groceries", origin: "Supplier C", destination: "Cold-Stow-2", status: "In Warehouse", weight: 1600, created: "2025-11-01T10:15:00Z" },
  { id: "PLT-009", contents: "Auto Parts", origin: "Supplier A", destination: "Rack 1C", status: "Loading", weight: 2100, created: "2025-11-01T09:00:00Z" },
  { id: "PLT-010", contents: "Electronics", origin: "Supplier A", destination: "Rack 1A", status: "In Warehouse", weight: 1250, created: "2025-10-31T15:00:00Z" },
];
