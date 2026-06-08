import React, { useEffect, useMemo, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory.jsx";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { loadItems, loadUser, saveItems, saveUser } from "./lib/storage";

export default function App() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null); // { name, role: 'admin'|'staff' }
  const [items, setItems] = useState([]);

  useEffect(() => {
    const persistedUser = loadUser();
    const persistedItems = loadItems();

    setUser(persistedUser);
    if (persistedItems?.length) {
      setItems(persistedItems);
    } else {
      const demo = initialDemoItems();
      setItems(demo);
      saveItems(demo);
    }

    // Optional: preserve theme in localStorage (client-friendly)
    try {
      const t = localStorage.getItem("ims:theme");
      if (t === "dark") setDark(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (items) saveItems(items);
  }, [items]);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const lowStockCount = items.filter((i) => Number(i.quantity) < 5).length;
  const auth = useMemo(() => ({ user, setUser }), [user]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-bg dark:bg-[#0b1220] text-gray-800 dark:text-gray-200 transition-colors">
        <Router>
          {user ? (
            <div className="flex">
              <Sidebar lowStockCount={lowStockCount} user={user} />
              <div className="flex-1 min-h-screen flex flex-col">
                <Navbar
                  toggleDark={() => {
                    setDark((d) => {
                      const next = !d;
                      try {
                        localStorage.setItem("ims:theme", next ? "dark" : "light");
                      } catch {
                        // ignore
                      }
                      return next;
                    });
                  }}
                  user={user}
                  onLogout={() => setUser(null)}
                />
                <main className="p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard items={items} />} />
                    <Route path="/inventory" element={<Inventory items={items} setItems={setItems} user={user} />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/reports" element={<Reports items={items} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
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

