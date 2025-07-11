import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function POST(req: Request) { 
    const body = await req.json();
    return new Response(JSON.stringify({
        message: "Request received",
        req: body,
        body: body
    }), {
        headers: { "Content-Type": "application/json" }
    });
}