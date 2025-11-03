import { motion } from "framer-motion";

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to PalletOS - Your logistics command center
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Metric {i}</h3>
            <p className="text-3xl font-bold text-primary">
              {Math.floor(Math.random() * 1000)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              +{Math.floor(Math.random() * 20)}% from last month
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
