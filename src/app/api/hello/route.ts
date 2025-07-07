import { NextRequest, NextResponse } from "next/server";

type Data = {
  name: string;
};

export async function GET() {
  
  return NextResponse.json(
    { 
      name: "Hello from /api/hello" 
    }
  );
}