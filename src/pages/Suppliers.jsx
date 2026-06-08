import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { loadSuppliers, saveSuppliers } from "../lib/storage";
import { nextId } from "../lib/id";

function emptySupplier() {
  return {
    id: null,
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  };
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(emptySupplier());

  useEffect(() => {
    const persisted = loadSuppliers();
    if (persisted?.length) setSuppliers(persisted);
    else {
      const demo = [
        { id: 1, name: "ABC Supplies", phone: "", email: "", address: "", notes: "" },
        { id: 2, name: "OfficeWorld", phone: "", email: "", address: "", notes: "" },
      ];
      setSuppliers(demo);
      saveSuppliers(demo);
    }
  }, []);

  useEffect(() => {
    saveSuppliers(suppliers);
  }, [suppliers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter((s) => `${s.name} ${s.email} ${s.phone}`.toLowerCase().includes(q));
  }, [suppliers, search]);

  const beginAdd = () => {
    setEditingId("new");
    setDraft(emptySupplier());
  };

  const beginEdit = (s) => {
    setEditingId(s.id);
    setDraft({ ...s });
  };

  const cancel = () => {
    setEditingId(null);
    setDraft(emptySupplier());
  };

  const upsert = () => {
    const name = draft.name.trim();
    if (!name) return alert("Supplier name is required");

    if (editingId === "new") {
      const id = nextId(suppliers);
      const toAdd = { ...draft, id, name };
      setSuppliers([toAdd, ...suppliers]);
      cancel();
      return;
    }

    setSuppliers((prev) => prev.map((s) => (s.id === editingId ? { ...s, ...draft, name } : s)));
    cancel();
  };

  const remove = (id) => {
    const s = suppliers.find((x) => x.id === id);
    const ok = window.confirm(`Delete supplier${s?.name ? ` "${s.name}"` : ""}?`);
    if (!ok) return;
    setSuppliers((prev) => prev.filter((x) => x.id !== id));
    if (editingId === id) cancel();
  };

  const exportCSV = () => {
    const csv = Papa.unparse(suppliers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suppliers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Suppliers</h2>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-2 rounded">
            Export CSV
          </button>
          <button onClick={beginAdd} className="bg-primary text-white px-3 py-2 rounded">
            Add Supplier
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#071022] p-4 rounded-2xl shadow space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border p-2 rounded bg-transparent"
          />
        </div>

        <div className="border rounded-xl p-4">
          {editingId ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="border p-2 rounded bg-transparent"
                  placeholder="Supplier name"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                />
                <input
                  className="border p-2 rounded bg-transparent"
                  placeholder="Phone"
                  value={draft.phone}
                  onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                />
                <input
                  className="border p-2 rounded bg-transparent"
                  placeholder="Email"
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                />
                <input
                  className="border p-2 rounded bg-transparent"
                  placeholder="Address"
                  value={draft.address}
                  onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
                />
              </div>
              <textarea
                className="w-full border p-2 rounded bg-transparent"
                placeholder="Notes"
                rows={3}
                value={draft.notes}
                onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
              />

              <div className="flex gap-2">
                <button onClick={upsert} className="bg-primary text-white px-4 py-2 rounded">
                  {editingId === "new" ? "Create" : "Save"}
                </button>
                <button onClick={cancel} className="border px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Select “Add Supplier” to create a supplier profile.</div>
          )}
        </div>

        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Address</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-2 font-medium">{s.name}</td>
                  <td className="p-2">{s.email || "—"}</td>
                  <td className="p-2">{s.phone || "—"}</td>
                  <td className="p-2">{s.address || "—"}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => beginEdit(s)} className="px-3 py-1 border rounded">
                        Edit
                      </button>
                      <button onClick={() => remove(s.id)} className="px-3 py-1 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={5} className="p-4 text-sm text-gray-500">
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

