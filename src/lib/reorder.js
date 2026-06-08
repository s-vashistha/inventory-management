export function reorderSuggestionsForItem(item) {
  const rp = Number(item.reorderPoint ?? 0);
  const tl = Number(item.targetLevel ?? 0);
  const qty = Number(item.quantity ?? 0);

  if (!rp || !tl) return null;
  if (qty >= rp) return null;
  const suggested = tl - qty;
  if (suggested <= 0) return null;
  return { suggestedQty: suggested, reorderPoint: rp, targetLevel: tl };
}

export function computeReorderList(items) {
  return items
    .map((it) => {
      const s = reorderSuggestionsForItem(it);
      if (!s) return null;
      return {
        itemId: it.id,
        name: it.name,
        category: it.category,
        currentQty: Number(it.quantity ?? 0),
        reorderPoint: s.reorderPoint,
        targetLevel: s.targetLevel,
        suggestedQty: s.suggestedQty,
        preferredSupplierId: it.preferredSupplierId ?? "",
      };
    })
    .filter(Boolean);
}

