import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const client = await clientPromise;
    const db = client.db("smarttailor");
    const orders = db.collection("orders");

    orderData.status = "Order Created";
    orderData.createdAt = new Date();


    // Optional: validate required fields here

    const result = await orders.insertOne(orderData);

    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
    });
  } catch (err) {
    console.error("ORDER INSERT ERROR:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}