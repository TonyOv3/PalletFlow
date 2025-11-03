import { KpiCardData, Shipment } from "./types";
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
