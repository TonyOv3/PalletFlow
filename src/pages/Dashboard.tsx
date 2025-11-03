import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { kpiData, recentShipments } from "@/lib/mockData";
import { KpiCardData, Shipment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Helper component for the KPI cards
function KpiCard({ card }: { card: KpiCardData }) {
  const Icon = card.icon;
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{card.value}</div>
          <p
            className={cn(
              "text-xs mt-1",
              card.changeType === "positive"
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {card.change} vs. last month
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Helper component for the shipment status badge
function StatusBadge({ status }: { status: Shipment["status"] }) {
  // Custom variant logic for our "Fintech Bold" aesthetic
  let className = "";
  if (status === "Pending") {
    className = "bg-yellow-500/20 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/30";
  } else if (status === "In Transit") {
    className = "bg-blue-500/20 text-blue-500 border-blue-500/30 hover:bg-blue-500/30";
  } else if (status === "Delivered") {
    className = "bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30";
  } else if (status === "Failed") {
    className = "bg-red-500/20 text-red-500 border-red-500/30 hover:bg-red-500/30";
  }

  return (
    <Badge variant="outline" className={cn("font-medium", className)}>
      {status}
    </Badge>
  );
}

export function Dashboard() {
  return (
    <motion.div
      className="flex-1 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome back, Harold.</h1>
          <p className="text-muted-foreground text-lg">
            Here's a high-level overview of your logistics operation.
          </p>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        {kpiData.map((card) => (
          <KpiCard key={card.title} card={card} />
        ))}
      </motion.div>

      {/* Main Content Area (Table + Other Widgets) */}
      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        variants={containerVariants}
      >
        {/* Recent Shipments Table */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>
                Tracking the latest movements in your network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead className="text-right">Pallets</TableHead>
                    <TableHead>Last Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>
                        <StatusBadge status={shipment.status} />
                      </TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell className="text-right">{shipment.palletCount}</TableCell>
                      <TableCell className="text-muted-foreground">{shipment.lastUpdate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Widget (e.g., Quick Actions or Alerts) */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Alerts</CardTitle>
              <CardDescription>
                Immediate items needing attention.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border">
                <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <p className="font-semibold">Low Stock: Pallet Wraps</p>
                  <p className="text-sm text-muted-foreground">
                    Only 50 units remaining. Recommend re-order.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                <div>
                  <p className="font-semibold">Dock 4 Maintenance</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled for 4:00 PM today. Re-route incoming.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
