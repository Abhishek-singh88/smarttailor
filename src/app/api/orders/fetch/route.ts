import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("smarttailor");
    const orders = db.collection("orders");

    const userOrders = await orders
      .find({ customerEmail: email })
      .sort({ createdAt: -1 }) // recent orders first
      .toArray();

    return NextResponse.json({ success: true, orders: userOrders });
  } catch (err) {
    console.error("FETCH ORDER ERROR:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
