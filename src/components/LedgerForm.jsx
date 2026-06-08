import React, { useMemo, useState } from "react";
import { Plus, FileText } from "lucide-react";

const TYPES = [
  { value: "receive", label: "Receive (add)" },
  { value: "adjust", label: "Adjust (delta)" },
  { value: "sell", label: "Sell/Dispatch (remove)" },
];

export default function LedgerForm({ items, suppliers, user, onCreate }) {
  const [type, setType] = useState("receive");
  const [itemId, setItemId] = useState(items[0]?.id ?? null);
  const [qty, setQty] = useState(0);
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const selectedItem = useMemo(() => items.find((i) => i.id === itemId) ?? null, [items, itemId]);

  React.useEffect(() => {
    if (items.length && !items.some((i) => i.id === itemId)) {
      setItemId(items[0].id);
    }
  }, [items, itemId]);

  const submit = (e) => {
    e.preventDefault();
    if (!itemId) return alert("Select an item");
    const qtyNum = Number(qty);
    if (!Number.isFinite(qtyNum) || qtyNum === 0) return alert("Enter a quantity (non-zero)");

    let qtyDelta = qtyNum;
    if (type === "sell") qtyDelta = -Math.abs(qtyNum);
    if (type === "receive") qtyDelta = Math.abs(qtyNum);
    if (type === "adjust") qtyDelta = qtyNum; // allow + or -

    const entry = {
      itemId,
      type,
      qtyDelta,
      reference: reference.trim(),
      notes: notes.trim(),
      date,
      performedBy: user?.name ?? "",
    };

    onCreate(entry);

    setReference("");
    setNotes("");
    setQty(0);
  };

  return (
    <form onSubmit={submit} className="border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Stock Transactions</div>
          <div className="text-sm text-gray-500">Record receiving, adjustments, and sell/dispatch to update inventory.</div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <FileText size={16} /> Ledger-based history
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-500">Transaction type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border p-2 rounded bg-transparent">
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500">Item</label>
          <select value={itemId ?? ""} onChange={(e) => setItemId(Number(e.target.value))} className="w-full border p-2 rounded bg-transparent">
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} ({i.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500">Quantity</label>
          <input
            className="w-full border p-2 rounded bg-transparent"
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder={type === "adjust" ? "e.g. 5 or -3" : "e.g. 10"}
          />
          {selectedItem && type !== "adjust" && (
            <div className="text-xs text-gray-500 mt-1">Current on-hand: {Number(selectedItem.quantity ?? 0)}</div>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-500">Date</label>
          <input className="w-full border p-2 rounded bg-transparent" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-500">Reference (optional)</label>
          <input className="w-full border p-2 rounded bg-transparent" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="PO / GRN / Invoice" />
        </div>
        <div>
          <label className="text-sm text-gray-500">Notes (optional)</label>
          <input className="w-full border p-2 rounded bg-transparent" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Reason / details" />
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16} /> Record
        </button>
      </div>
    </form>
  );
}

