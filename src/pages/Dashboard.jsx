import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Dashboard({ items = [] }) {
  // Aggregate categories
  const catMap = {};
  let totalValue = 0;
  items.forEach(i => {
    catMap[i.category] = (catMap[i.category] || 0) + Number(i.quantity);
    totalValue += Number(i.quantity) * Number(i.price || 0);
  });
  const pieData = Object.entries(catMap).map(([name, value]) => ({ name, value }));

  const barData = items.map(i => ({ name: i.name, qty: Number(i.quantity) }));

  const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#7C3AED"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white dark:bg-[#071022] p-4 rounded-2xl shadow">
          <h3 className="text-lg font-medium mb-2">Stock by Category</h3>
          <div className="h-44">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                  {pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#071022] p-4 rounded-2xl shadow">
          <h3 className="text-lg font-medium">Key Metrics</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <div>Total products</div>
              <div>{items.length}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>Total stock value</div>
              <div>${totalValue.toFixed(2)}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>Low stock items</div>
              <div className="text-warn">{items.filter(i=>i.quantity<5).length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#071022] p-4 rounded-2xl shadow">
        <h3 className="text-lg font-medium mb-4">Stock levels</h3>
        <div className="h-48">
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qty" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
