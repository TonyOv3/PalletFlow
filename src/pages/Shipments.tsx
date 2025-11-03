import { motion } from "framer-motion";

export function Shipments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold tracking-tight mb-2">Shipments</h1>
      <p className="text-muted-foreground mb-8">
        Track and manage your shipments in real-time
      </p>

      <div className="bg-card border border-border rounded-lg p-8">
        <p className="text-muted-foreground">
          Shipment tracking interface coming soon...
        </p>
      </div>
    </motion.div>
  );
}
