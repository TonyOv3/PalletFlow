import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Warehouse,
  Users,
  Truck,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle"; // <-- Import is included

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/inventory", icon: Warehouse, label: "Inventory" },
  { to: "/customers", icon: Users, label: "Customers" },
  { to: "/shipments", icon: Truck, label: "Shipments" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }}
      className="w-72 h-screen bg-muted/40 border-r border-border flex flex-col"
    >
      {/* Logo Area */}
      <div className="p-6 border-b border-border">
        <motion.h1
          className="text-2xl font-bold tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          PalletOS
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Logistics Operating System
        </motion.p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <NavLink to={item.to} end={item.to === "/"}>
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-11 px-4",
                      isActive && "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* User Area (FIXED LAYOUT) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 border-t border-border"
      >
        <div className="flex items-center gap-3">
          {/* This wrapper keeps the user info flexible */}
          <div className="flex flex-1 items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer min-w-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                john.doe@palletos.com
              </p>
            </div>
          </div>

          {/* The toggle is now a sibling, not breaking the flexbox */}
          <ThemeToggle />

        </div>
      </motion.div>
    </motion.aside>
  );
}
