import React, { useEffect, useMemo, useState } from "react";

export default function ItemAutomationForm({ item, onSave, onCancel }) {
  const [draft, setDraft] = useState(item);

  useEffect(() => {
    setDraft(item);
  }, [item]);

  const suggested = useMemo(() => {
    const rp = Number(draft.reorderPoint ?? 0);
    const tl = Number(draft.targetLevel ?? 0);
    return { rp, tl };
  }, [draft.reorderPoint, draft.targetLevel]);

  return (
    <div className="border rounded-xl p-4">
      <div className="text-lg font-semibold mb-3">Reorder Settings</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-500">Reorder Point</label>
          <input
            type="number"
            className="w-full border p-2 rounded bg-transparent"
            value={draft.reorderPoint ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, reorderPoint: e.target.value === "" ? "" : Number(e.target.value) }))}
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Target Level</label>
          <input
            type="number"
            className="w-full border p-2 rounded bg-transparent"
            value={draft.targetLevel ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, targetLevel: e.target.value === "" ? "" : Number(e.target.value) }))}
            placeholder="e.g. 20"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Preferred Supplier ID (optional)</label>
          <input
            type="number"
            className="w-full border p-2 rounded bg-transparent"
            value={draft.preferredSupplierId ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, preferredSupplierId: e.target.value === "" ? "" : Number(e.target.value) }))}
            placeholder="e.g. 1"
          />
        </div>
        <div className="flex items-end">
          <div className="text-xs text-gray-500">
            Low-stock rule: if on-hand {'<'} reorderPoint {'->'} suggest (targetLevel - onHand)

          </div>
        </div>

      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onSave({
            reorderPoint: draft.reorderPoint === "" ? null : Number(draft.reorderPoint),
            targetLevel: draft.targetLevel === "" ? null : Number(draft.targetLevel),
            preferredSupplierId: draft.preferredSupplierId === "" ? null : Number(draft.preferredSupplierId),
          })}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button onClick={onCancel} className="border px-4 py-2 rounded">Cancel</button>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Current values: RP={suggested.rp || 0}, Target={suggested.tl || 0}
      </div>
    </div>
  );
}

