import { motion } from "framer-motion";

export function Customers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold tracking-tight mb-2">Customers</h1>
      <p className="text-muted-foreground mb-8">
        Manage your customer relationships and accounts
      </p>

      <div className="bg-card border border-border rounded-lg p-8">
        <p className="text-muted-foreground">
          Customer management interface coming soon...
        </p>
      </div>
    </motion.div>
  );
}
