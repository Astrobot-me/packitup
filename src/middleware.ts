import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"

export default async function middleware(req: NextRequest,) {
 

    
    const token = await getToken({ 
      req,
      secret:process.env.AUTH_SECRET
    });

    const url = req.nextUrl;

    if (!token && url.pathname.startsWith("/users")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && (
        url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/verify-code") ||
        url.pathname.startsWith("/signup")
    )) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
