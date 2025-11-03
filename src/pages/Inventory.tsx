import { motion } from "framer-motion";

export function Inventory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold tracking-tight mb-2">Inventory</h1>
      <p className="text-muted-foreground mb-8">
        Manage your warehouse stock and inventory levels
      </p>

      <div className="bg-card border border-border rounded-lg p-8">
        <p className="text-muted-foreground">
          Inventory management interface coming soon...
        </p>
      </div>
    </motion.div>
  );
}
