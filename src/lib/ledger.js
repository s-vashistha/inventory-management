import { loadItems, saveItems } from "./storage";

const KEYS = {
  ledger: "ims:ledger",
};

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function loadLedger() {
  const raw = localStorage.getItem(KEYS.ledger);
  return raw ? safeParse(raw, []) : [];
}

export function saveLedger(entries) {
  localStorage.setItem(KEYS.ledger, JSON.stringify(entries));
}

export function nextLedgerId(existing = []) {
  const max = existing.reduce((m, x) => (typeof x?.id === "number" ? Math.max(m, x.id) : m), 0);
  return max + 1;
}

/**
 * Apply a ledger entry to an items list and return updated items.
 * Strategy: quantity = quantity + qtyDelta
 */
export function applyLedgerEntryToItems(items, entry) {
  const qtyDelta = Number(entry.qtyDelta || 0);
  return items.map((it) => (it.id === entry.itemId ? { ...it, quantity: Number(it.quantity) + qtyDelta } : it));
}

/**
 * Recompute quantities from scratch using current items as starting point.
 * (Assumes current items.quantity is treated as current base; for full source-of-truth,
 * client would use an initial receive ledger seed.)
 *
 * For now, we provide a helper to validate/normalize.
 */
export function rebuildLedgerFromItemsBaseline(items, ledgerEntries) {
  // No-op baseline: we keep item.quantity as-is.
  return { items: items, ledger: ledgerEntries };
}

/**
 * Convenience to update both items and ledger atomically.
 */
export function commitLedgerEntry(entry) {
  const items = loadItems();
  const ledger = loadLedger();

  const nextEntry = { ...entry };
  const updatedItems = applyLedgerEntryToItems(items, nextEntry);

  saveItems(updatedItems);
  saveLedger([nextEntry, ...ledger]);

  return { items: updatedItems, ledger: [nextEntry, ...ledger] };
}

