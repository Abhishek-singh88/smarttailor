"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function TailorDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tailor, setTailor] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
  const savedTailor = localStorage.getItem("tailor");
  if (savedTailor) {
    setTailor(JSON.parse(savedTailor));
  }
  fetchOrders();
}, []);


  const fetchOrders = async () => {
    const res = await fetch("/api/orders/all");
    const data = await res.json();
    setOrders(data.orders || []);
  };

  const handleStatusChange = (order: any, status: string) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setShowConfirmModal(true);
  };

  const confirmStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;

    await fetch(`/api/orders/update?id=${selectedOrder._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setShowConfirmModal(false);
    fetchOrders();
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {tailor?.name || "Tailor"}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Incoming Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left border border-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Order ID</th>
                <th className="px-4 py-2 border-b border-gray-700">Customer</th>
                <th className="px-4 py-2 border-b border-gray-700">Fabric</th>
                <th className="px-4 py-2 border-b border-gray-700">Gender</th>
                <th className="px-4 py-2 border-b border-gray-700">Measurements</th>
                <th className="px-4 py-2 border-b border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">#{orders.length - index}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{order.customerName}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{order.fabric}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{order.gender}</td>
                  <td className="px-4 py-2 border-b border-gray-700 text-xs">
                    Shoulder: {order.shoulder}, Chest: {order.chest}, Waist: {order.waist},<br />
                    Hips: {order.hips}, Height: {order.height}, Sleeve: {order.sleeve}, Neck: {order.neck}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    <select
                      defaultValue={order.status || "None"}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
                    >
                      <option disabled value="None">
                        -- Select Status --
                      </option>
                      <option value="Cutting Started">Cutting Started</option>
                      <option value="Trial Ready">Trial Ready</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Status Update</h2>
            <p className="mb-4">
              Are you sure you want to update the status to <strong>{newStatus}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-400 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
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