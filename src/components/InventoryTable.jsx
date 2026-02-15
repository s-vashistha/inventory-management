import React, { useState } from "react";

export default function InventoryTable({ items = [], updateItem, deleteItem, isEditable }) {
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});

  const startEdit = (item) => {
    setEditing(item.id);
    setDraft({ ...item });
  };

  const save = (id) => {
    updateItem(id, draft);
    setEditing(null);
  };

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          <th className="p-2">Name</th>
          <th className="p-2">Category</th>
          <th className="p-2">Quantity</th>
          <th className="p-2">Price</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          const low = Number(item.quantity) < 5;
          return (
            <tr key={item.id} className={`${low ? "bg-red-400" : "bg-transparent"} border-b`}>
              <td className="p-2">
                {editing === item.id ? (
                  <input value={draft.name} onChange={e=>setDraft(d=>({...d, name: e.target.value}))} className="border p-1 rounded w-full bg-transparent" />
                ) : item.name}
              </td>
              <td className="p-2">
                {editing === item.id ? (
                  <input value={draft.category} onChange={e=>setDraft(d=>({...d, category: e.target.value}))} className="border p-1 rounded w-full bg-transparent" />
                ) : <span className="px-2 py-1 rounded text-sm bg-primary/10 text-primary">{item.category}</span>}
              </td>
              <td className="p-2">
                {editing === item.id ? (
                  <input type="number" value={draft.quantity} onChange={e=>setDraft(d=>({...d, quantity: Number(e.target.value)}))} className="border p-1 rounded w-24 bg-transparent" />
                ) : <span className={`${low ? "text-red-600 font-semibold" : ""}`}>{item.quantity}</span>}
              </td>
              <td className="p-2">${item.price}</td>
              <td className="p-2 flex gap-2">
                {isEditable && (
                  editing === item.id ? (
                    <>
                      <button onClick={()=>save(item.id)} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                      <button onClick={()=>setEditing(null)} className="px-3 py-1 border rounded">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>startEdit(item)} className="px-3 py-1 border rounded">Edit</button>
                      <button onClick={()=>deleteItem(item.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                    </>
                  )
                )}
                {!isEditable && <div className="text-sm text-gray-500">No actions</div>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
