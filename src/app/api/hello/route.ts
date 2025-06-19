"use server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from App Router API!",
    status: 200,
    data: null,
  });
}
