// src/app/page.tsx (Landing Page)
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Welcome to SmartTailor</h1>
      <p className="text-sm md:text-base text-center mb-8 max-w-md">
        A mobile-friendly ERP system for local tailoring shops to manage orders, fabric inventory, and customer preferences.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => router.push("/auth/tailor")}
          className="bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-xl text-base font-semibold w-full cursor-pointer"
        >
          Login / Sign Up as Tailor
        </button>
        <button
          onClick={() => router.push("/auth/customer")}
          className="bg-green-600 hover:bg-green-700 py-3 px-4 rounded-xl text-base font-semibold w-full cursor-pointer"
        >
          Login / Sign Up as Customer
        </button>
      </div>
    </main>
  );
}
