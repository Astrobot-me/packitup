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

    const url = req.nextUrl;
    console.log("Token valid:", isTokenValid);
    const isRefreshPage = url.pathname === "/refresh-access";
    if (isRefreshPage) {
        return NextResponse.next(); // Skip all checks
    }


    if (!isTokenValid && token) {

        return NextResponse.redirect(new URL("/refresh-access", req.url));
        // request new tokens if the refreshToken is valid and access token expired 
        // const res = await fetch(`${req.nextUrl.origin}/api/refresh-access`, {
        //     method: "POST",
        //     // headers: {
        //     //     cookie: req.headers.get("cookie") ?? "", 
        //     // },
        // });

        // if (res) {
        //     const result = await res.json();
        //     console.log(" Middleware refresh: ", result)

        //     if (result.success) {
        //         isTokenValid = true;
        //     } else {
        //         const response = NextResponse.redirect(new URL("/login", req.url));
        //         response.cookies.set("refreshToken", "", {
        //             httpOnly: true,
        //             secure: true,
        //             path: "/",
        //             expires: new Date(0), // Expire immediately
        //         });

        //         return response;
        //     }
        // }

    }



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
