import dbConnnet from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  name: string;
};

export async function GET() {
  await dbConnnet();
  return NextResponse.json(
    { 
      name: "Hello from /api/hello" 
    }
  );
}