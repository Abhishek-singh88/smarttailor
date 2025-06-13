"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerAuth() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); // <- add loading state

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "tailor" }),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.error("JSON Parse Error:", jsonErr);
      alert("Server returned invalid response.");
      setLoading(false);
      return;
    }

    if (res.ok && data.user) {
      localStorage.setItem("tailor", JSON.stringify(data.user));
      router.push("/tailor/dashboard");
    } else {
      alert(data.error || "Registration failed.");
      setLoading(false);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Something went wrong.");
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Customer Login / Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2 rounded text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 rounded text-white"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
