// src/app/api/auth/register/route.ts
import clientPromise from '@/lib/mongo';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    console.log("Received:", { name, email, role });

    const client = await clientPromise;
    const db = client.db('smarttailor');
    const users = db.collection('users');

    console.log("Connected to DB");

    const existing = await users.findOne({ email, role });
    console.log("User check:", existing);

    if (existing) {
      if (existing.password === password) {
        return NextResponse.json({ login: true, user: existing });
      } else {
        return NextResponse.json({ login: false, error: "Incorrect password" }, { status: 401 });
      }
    }

    const newUser = { name, email, password, role };
    const result = await users.insertOne(newUser);
    console.log("User inserted:", result.insertedId);

    return NextResponse.json({ login: false, user: newUser });
  } catch (err) {
    console.error("REGISTER API ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
