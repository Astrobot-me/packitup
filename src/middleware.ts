import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";


export default async function middleware(req: NextRequest,) {
    const token = req.cookies.get("accessToken")?.value;
    const secret = new TextEncoder().encode(process.env.ACCESS_SECRET);

    let payload = null;
    let isTokenValid = false;
    

    if (secret && token) {
        try {
            const decoded = jwtVerify(token, secret);
            payload = (await decoded).payload
            isTokenValid = true;
        } catch (err) {
            // console.log(err)
            isTokenValid = false;

        }
    }

    // if (!isTokenValid && token) {
    //     // request new tokens if the refreshToken is valid and access token expired 
    //     const res = await fetch(`${req.nextUrl.origin}/api/refresh-access`, {
    //         method: "POST",
    //         // headers: {
    //         //     cookie: req.headers.get("cookie") ?? "", 
    //         // },
    //     });

    //     if (res) {
    //         const result = await res.json();
    //         console.log(" Middleware refresh: ", result)

    //         if (result.success) {
    //             isTokenValid = true;
    //         } else {
    //             const response = NextResponse.redirect(new URL("/login", req.url));
    //             response.cookies.set("refreshToken", "", {
    //                 httpOnly: true,
    //                 secure: true,
    //                 path: "/",
    //                 expires: new Date(0), // Expire immediately
    //             });

    //             return response;
    //         }
    //     }

    // }

    console.log("Token valid:", isTokenValid);
    // console.log("Redirecting to:", new URL("/login", req.url).toString());

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
