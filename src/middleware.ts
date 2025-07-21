import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";


export default async function middleware(req: NextRequest,) {
 

    
    let isTokenValid = true;

    const url = req.nextUrl;

    if (!isTokenValid && url.pathname.startsWith("/users")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isTokenValid && (
        url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/verify-code") ||
        url.pathname.startsWith("/signup")
    )) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
