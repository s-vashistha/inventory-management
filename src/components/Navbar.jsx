import React from "react";
import { Moon, Sun, LogOut } from "lucide-react";

export default function Navbar({ toggleDark, user, onLogout }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white/60 dark:bg-[#071022]/60 backdrop-blur-md shadow-sm rounded-b-2xl mx-4 -mt-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-primary dark:text-white">Inventory Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-300">Manage products, stock & reports</div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleDark} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition">
          <Moon size={16} />
        </button>

        <div className="flex items-center gap-3 bg-white dark:bg-[#0b1320] px-3 py-1 rounded-2xl shadow">
          <div className="text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</div>
          </div>
          <button onClick={onLogout} className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30">
            <LogOut size={16} className="text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
