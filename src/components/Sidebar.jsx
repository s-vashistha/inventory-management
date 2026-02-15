import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Users, BarChart2, Truck } from "lucide-react";

export default function Sidebar({ lowStockCount, user }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-primary"}`;

  return (
    <aside className="w-72 bg-white dark:bg-[#071022] border-r border-gray-100 dark:border-[#0b1320] px-4 py-6 min-h-screen sticky top-0">
      <div className="px-2 mb-6">
        <div className="text-2xl font-bold text-primary">IMS</div>
        <div className="text-xs text-gray-500">Inventory Management</div>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={linkClass}>
          <BarChart2 /> Overview
        </NavLink>

        <NavLink to="/inventory" className={linkClass}>
          <Box /> Items
          {lowStockCount > 0 && (
            <span className="ml-auto bg-warn text-white text-xs px-2 py-0.5 rounded-full">{lowStockCount}</span>
          )}
        </NavLink>

        <NavLink to="/suppliers" className={linkClass}>
          <Truck /> Suppliers
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <Users /> Reports
        </NavLink>
      </nav>

      <div className="mt-8 text-xs text-gray-400 px-3">
        Role: <span className="text-gray-600 dark:text-gray-300 ml-1">{user?.role}</span>
      </div>
    </aside>
  );
}
