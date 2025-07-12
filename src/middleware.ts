import { NextResponse, type NextRequest } from "next/server"
import jwt  from "jsonwebtoken"

export const config = {
    matcher: [
        '/dashboard/:path*', 
        '/sign-in', 
        '/sign-up', 
        '/', 
        '/verify/:path*'
    ],

}

export default async function middleware(req: NextRequest,){

    const token = req.cookies.get("accessToken")?.value

    const secret = process.env.ACCESS_SECRET
    let isTokenValid = null ; 

    if (secret && token){
        isTokenValid = jwt.verify(token, secret)
    }



    const url = req.nextUrl; 
    if(!isTokenValid && url.pathname.startsWith("/users/:userid")) {
        NextResponse.redirect(new URL("/login", req.url))
    }

    if(isTokenValid && (
        url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/verify-user") ||
        url.pathname.startsWith("/signup")
    )){
        NextResponse.redirect(new URL("/", req.url))
    }

}