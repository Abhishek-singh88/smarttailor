import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const { status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("smarttailor");

    await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
