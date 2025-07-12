import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    const secret = process.env.ACCESS_SECRET;

    let isTokenValid = false;

    if (secret && token) {
        try {
            jwt.verify(token, secret);
            isTokenValid = true;
        } catch (err) {
            isTokenValid = false;
        }
    }

    // console.log("Token valid:", isTokenValid);
    // console.log("Redirecting to:", new URL("/login", req.url).toString());

    const url = req.nextUrl;

    if (!isTokenValid && url.pathname.startsWith("/users")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isTokenValid && (
        url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/verify-user") ||
        url.pathname.startsWith("/signup")
    )) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
