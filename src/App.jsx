import React, { useState, useMemo } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory.jsx";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {
  // global state (in a real app you'd use context / redux)
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null); // { name, role: 'admin'|'staff' }
  const [items, setItems] = useState(initialDemoItems());

  const lowStockCount = items.filter(i => Number(i.quantity) < 5).length;

  const auth = useMemo(() => ({ user, setUser }), [user]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-bg dark:bg-[#0b1220] text-gray-800 dark:text-gray-200 transition-colors">
        <Router>
          {user ? (
            <div className="flex">
              <Sidebar lowStockCount={lowStockCount} user={user} />
              <div className="flex-1 min-h-screen flex flex-col">
                <Navbar toggleDark={() => setDark(d => !d)} user={user} onLogout={() => setUser(null)} />
                <main className="p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard items={items} />} />
                    <Route path="/inventory" element={
                      <Inventory items={items} setItems={setItems} user={user} />
                    } />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/reports" element={<Reports items={items} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login onLogin={(u)=>setUser(u)} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </Router>
      </div>
    </div>
  );
}

function initialDemoItems() {
  return [
    { id: 1, name: "Wireless Mouse", quantity: 12, price: 14.99, category: "Electronics" },
    { id: 2, name: "USB-C Cable", quantity: 3, price: 6.5, category: "Electronics" },
    { id: 3, name: "T-Shirt (M)", quantity: 20, price: 9.99, category: "Apparel" },
    { id: 4, name: "Coffee Beans 1kg", quantity: 2, price: 12.0, category: "Grocery" },
    { id: 5, name: "Notebook A4", quantity: 50, price: 2.5, category: "Stationery" },
  ];
}
