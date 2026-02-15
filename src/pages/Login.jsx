import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("staff");

  const submit = (e) => {
    e.preventDefault();
    if (!name) return alert("Enter name");
    onLogin({ name, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white dark:bg-[#071022] p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in to IMS</h2>

        <input className="w-full border p-2 rounded mb-3 bg-transparent" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />

        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full border p-2 rounded mb-4 bg-transparent">
          <option value="admin">Admin (full access)</option>
          <option value="staff">Staff (read-only)</option>
        </select>

        <button className="w-full bg-primary text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  );
}
