export default function CustomerHome() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Customer!</h1>

      <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded mb-6">
        Place New Order
      </button>

      <section>
        <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2">Order ID</th>
                <th className="p-2">Fabric</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="p-2">#001</td>
                <td className="p-2">Cotton</td>
                <td className="p-2">Cutting Started</td>
                <td className="p-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs">
                    Reorder
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
