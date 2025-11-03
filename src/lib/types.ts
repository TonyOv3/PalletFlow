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
