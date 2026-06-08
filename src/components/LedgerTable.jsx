import React, { useMemo, useState } from "react";
import Papa from "papaparse";

export default function LedgerTable({ ledger, items, onDelete }) {
  const [search, setSearch] = useState("");

  const itemById = useMemo(() => {
    const m = new Map();
    items.forEach((i) => m.set(i.id, i));
    return m;
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ledger;
    return ledger.filter((e) => {
      const it = itemById.get(e.itemId);
      return (
        String(it?.name ?? "").toLowerCase().includes(q) ||
        String(e.type ?? "").toLowerCase().includes(q) ||
        String(e.reference ?? "").toLowerCase().includes(q) ||
        String(e.notes ?? "").toLowerCase().includes(q)
      );
    });
  }, [ledger, itemById, search]);

  const exportCSV = () => {
    const csv = Papa.unparse(
      filtered
        .slice()
        .reverse()
        .map((e) => ({
          id: e.id,
          date: e.date,
          itemId: e.itemId,
          itemName: itemById.get(e.itemId)?.name ?? "",
          type: e.type,
          qtyDelta: e.qtyDelta,
          reference: e.reference,
          notes: e.notes,
          performedBy: e.performedBy,
        }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "stock-ledger.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Stock Ledger</div>
          <div className="text-sm text-gray-500">Append-only transaction history (exportable).</div>
        </div>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded bg-transparent"
            placeholder="Search ledger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-2 rounded">
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="p-2">Date</th>
              <th className="p-2">Item</th>
              <th className="p-2">Type</th>
              <th className="p-2">Qty Δ</th>
              <th className="p-2">Reference</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Performed By</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered
                .slice()
                .reverse()
                .map((e) => (
                  <tr key={e.id} className="border-b">
                    <td className="p-2 text-sm">{e.date}</td>
                    <td className="p-2 text-sm font-medium">{itemById.get(e.itemId)?.name ?? e.itemId}</td>
                    <td className="p-2 text-sm">{e.type}</td>
                    <td className={`p-2 text-sm font-semibold ${Number(e.qtyDelta) >= 0 ? "text-accent" : "text-danger"}`}>
                      {Number(e.qtyDelta) >= 0 ? "+" : ""}{e.qtyDelta}
                    </td>
                    <td className="p-2 text-sm">{e.reference || "—"}</td>
                    <td className="p-2 text-sm">{e.notes || "—"}</td>
                    <td className="p-2 text-sm">{e.performedBy || "—"}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-sm text-gray-500">
                  No ledger entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

