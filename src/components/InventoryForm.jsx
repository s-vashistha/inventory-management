import React, { useState } from "react";

export default function InventoryForm({ addItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name || quantity==="" || price==="" || !category) return alert("Please fill all fields");
    addItem({ name, quantity: Number(quantity), price: Number(price), category });
    setName(""); setQuantity(""); setPrice(""); setCategory("");
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-4 gap-3">
      <input className="col-span-1 border p-2 rounded bg-transparent" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      <input className="col-span-1 border p-2 rounded bg-transparent" placeholder="Item name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="col-span-1 border p-2 rounded bg-transparent" placeholder="Quantity" type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} />
      <input className="col-span-1 border p-2 rounded bg-transparent" placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
      <button type="submit" className="col-span-4 bg-primary text-white py-2 rounded mt-1">Add Item</button>
    </form>
  );
}
