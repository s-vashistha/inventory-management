import { loadLedger, saveLedger, nextLedgerId, applyLedgerEntryToItems } from "./ledger";
import { loadItems, saveItems } from "./storage";

export function commitTransaction(entry) {
  const itemId = Number(entry.itemId);
  const type = entry.type;
  const qtyDelta = Number(entry.qtyDelta);

  if (!itemId) throw new Error("itemId is required");
  if (!type) throw new Error("type is required");
  if (!Number.isFinite(qtyDelta) || qtyDelta === 0) throw new Error("qtyDelta must be non-zero");

  const ledger = loadLedger();
  const items = loadItems();

  const nextEntry = {
    id: nextLedgerId(ledger),
    itemId,
    type,
    qtyDelta,
    reference: entry.reference ?? "",
    notes: entry.notes ?? "",
    date: entry.date ?? new Date().toISOString().slice(0, 10),
    performedBy: entry.performedBy ?? "",
    createdAt: new Date().toISOString(),
  };

  const updatedItems = applyLedgerEntryToItems(items, nextEntry);

  saveItems(updatedItems);
  saveLedger([nextEntry, ...ledger]);

  return { items: updatedItems, ledger: [nextEntry, ...ledger] };
}

export function deleteLedgerEntry(id) {
  // Append-only history: deletion not supported.
  return { ok: false, reason: "append-only" };
}


