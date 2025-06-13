"use client";

import { FormEvent } from "react";

export default function CreateOrderModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (order: {
    fabric: string;
    gender: string;
    shoulder: string;
    chest: string;
    waist: string;
    hips: string;
    height: string;
    sleeve: string;
    neck: string;
  }) => void;
}) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries()) as any;
    onSubmit(order);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Create New Order</h2>

        <label className="block mb-2 font-medium">Select Fabric</label>
        <select
          name="fabric"
          className="w-full mb-3 p-2 border rounded bg-white text-black hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="Cotton">Cotton</option>
          <option value="Silk">Silk</option>
          <option value="Linen">Linen</option>
          <option value="Wool">Wool</option>
          <option value="Denim">Denim</option>
          <option value="Rayon">Rayon</option>
          <option value="Velvet">Velvet</option>
          <option value="Satin">Satin</option>
        </select>

        <label className="block mb-2 font-medium">Clothing For (Gender)</label>
        <select
          name="gender"
          className="w-full mb-4 p-2 border rounded bg-white text-black hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Child (Boy)">Child (Boy)</option>
          <option value="Child (Girl)">Child (Girl)</option>
        </select>

        <label className="block mb-1">Shoulder (inches)</label>
        <input name="shoulder" type="text" className="w-full mb-2 p-2 border rounded" required />

        <label className="block mb-1">Chest (inches)</label>
        <input name="chest" type="text" className="w-full mb-2 p-2 border rounded" required />

        <label className="block mb-1">Waist (inches)</label>
        <input name="waist" type="text" className="w-full mb-2 p-2 border rounded" required />

        <label className="block mb-1">Hips (inches)</label>
        <input name="hips" type="text" className="w-full mb-2 p-2 border rounded" required />

        <label className="block mb-1">Height (inches)</label>
        <input name="height" type="text" className="w-full mb-2 p-2 border rounded" required />

        <label className="block mb-1">Sleeve Length (inches)</label>
        <input name="sleeve" type="text" className="w-full mb-2 p-2 border rounded" required />

        <label className="block mb-1">Neck (inches)</label>
        <input name="neck" type="text" className="w-full mb-4 p-2 border rounded" required />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
