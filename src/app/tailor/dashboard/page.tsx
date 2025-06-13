export default function TailorDashboard() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Tailor Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Incoming Orders</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="p-2">#001</td>
                <td className="p-2">Abhishek</td>
                <td className="p-2">2025-06-15</td>
                <td className="p-2">Cutting Started</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Fabric Stock</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Cotton – 15 meters</li>
          <li>Silk – 8 meters</li>
          <li>Linen – 20 meters</li>
        </ul>
      </section>
    </main>
  );
}