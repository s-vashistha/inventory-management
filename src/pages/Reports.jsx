import React from "react";

export default function Reports({ items = [] }){
  return (
    <div className="bg-white dark:bg-[#071022] p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Reports</h2>
      <p className="text-sm text-gray-500">Generate PDF/CSV reports and reorder suggestions (coming soon)</p>
    </div>
  );
}
