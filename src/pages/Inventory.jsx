import React, { useState, useMemo } from "react";
import Papa from "papaparse";
import InventoryForm from "../components/InventoryForm";
import InventoryTable from "../components/InventoryTable";

export default function Inventory({ items, setItems, user }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const addItem = (item) => {
    // add id
    const id = items.length ? Math.max(...items.map(i=>i.id))+1 : 1;
    setItems([{ id, ...item }, ...items]);
    setPage(1);
  };

  const updateItem = (id, updates) => {
    setItems(items.map(it => it.id === id ? { ...it, ...updates } : it));
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const exportCSV = () => {
    const csv = Papa.unparse(items);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const filtered = useMemo(() => {
    let list = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    if (filter === "low") list = list.filter(i => Number(i.quantity) < 5);
    if (filter === "in") list = list.filter(i => Number(i.quantity) >= 5);

    list = [...list].sort((a,b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (A < B) return sortOrder === "asc" ? -1 : 1;
      if (A > B) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [items, search, filter, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page-1)*perPage, (page-1)*perPage + perPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Inventory</h2>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-2 rounded">Export CSV</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#071022] p-4 rounded-2xl shadow space-y-4">
        <div className="flex gap-3">
          <input type="text" placeholder="Search items..." value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 border p-2 rounded bg-transparent" />
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="border p-2 rounded bg-transparent">
            <option value="all">All</option>
            <option value="low">Low Stock (&lt;5)</option>
            <option value="in">In Stock (≥5)</option>
          </select>

          <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="border p-2 rounded bg-transparent">
            <option value="name">Name</option>
            <option value="quantity">Quantity</option>
            <option value="price">Price</option>
          </select>
          <button onClick={()=>setSortOrder(o=>o==='asc'?'desc':'asc')} className="border p-2 rounded bg-transparent">{sortOrder}</button>
        </div>

        {user.role === "admin" ? <InventoryForm addItem={addItem}/>  : <div className="text-sm text-gray-500">Read-only mode for staff.</div>}

        <InventoryTable items={visible} updateItem={updateItem} deleteItem={deleteItem} isEditable={user.role==='admin'} />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing {(page-1)*perPage + 1} - {Math.min(page*perPage, filtered.length)} of {filtered.length}</div>
          <div className="flex gap-2">
            <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
            <div className="px-3 py-1 border rounded">Page {page} / {totalPages}</div>
            <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
