"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateOrderModal from "./createorder";

export default function CustomerHome() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderToReorder, setOrderToReorder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("customer");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCustomer(parsed);
      fetchOrders(parsed.email);
    }
  }, []);

  const fetchOrders = async (email: string) => {
    const res = await fetch(`/api/orders/fetch?email=${email}`);
    const data = await res.json();
    setOrders(data.orders || []);
  };

  const customerName = customer?.name || "Customer";

  const handleLogout = () => {
    router.push("/");
  };

  const handleReorder = async () => {
    if (!orderToReorder || !customer) return;
    await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...orderToReorder,
        customerEmail: customer.email,
        customerName: customer.name,
      }),
    });
    setShowConfirm(false);
    fetchOrders(customer.email);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 relative">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {customerName}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </header>

      <button
        className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded mb-6"
        onClick={() => setShowModal(true)}
      >
        + Create Order
      </button>

      <section>
        <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
        <div className="overflow-x-auto">
          
          <table className="min-w-full table-auto text-sm text-left border border-gray-700">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="px-4 py-2 border-b border-gray-700">Order ID</th>
      <th className="px-4 py-2 border-b border-gray-700">Fabric</th>
      <th className="px-4 py-2 border-b border-gray-700">Gender</th>
      <th className="px-4 py-2 border-b border-gray-700">Status</th>
      <th className="px-4 py-2 border-b border-gray-700">Measurements</th>
      <th className="px-4 py-2 border-b border-gray-700">Actions</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order, index) => (
      <tr key={index} className="border-t border-gray-700">
        <td className="px-4 py-2 border-b border-gray-700">#{orders.length - index}</td>
        <td className="px-4 py-2 border-b border-gray-700">{order.fabric}</td>
        <td className="px-4 py-2 border-b border-gray-700">{order.gender}</td>
        <td className="px-4 py-2 border-b border-gray-700">{order.status || "Pending"}</td>
        <td className="px-4 py-2 border-b border-gray-700 text-xs">
          Shoulder: {order.shoulder}, Chest: {order.chest}, Waist: {order.waist},<br />
          Hips: {order.hips}, Height: {order.height}, Sleeve: {order.sleeve}, Neck: {order.neck}
        </td>
        <td className="px-4 py-2 border-b border-gray-700">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
            onClick={() => {
              setOrderToReorder(order);
              setShowConfirm(true);
            }}
          >
            Reorder
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        </div>
      </section>

      {/* Order Modal */}
      {showModal && (
        <CreateOrderModal
          onClose={() => setShowModal(false)}
          onSubmit={async (order) => {
            if (!customer) return;
            await fetch("/api/orders/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...order,
                customerEmail: customer.email,
                customerName: customer.name,
              }),
            });
            setShowModal(false);
            fetchOrders(customer.email);
          }}
        />
      )}

      {/* Reorder Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Reorder this item?</h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReorder}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
