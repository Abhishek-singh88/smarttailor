import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("smarttailor");
    const orders = await db.collection("orders").find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("FETCH ALL ORDERS ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
