import dbConnnet from "@/lib/database";
import { UserModel } from "@/lib/models/UserModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {SignJWT} from "jose"; 

export async function POST (req : Request ){ 
    
    await dbConnnet(); 
    const { identifier } = await req.json(); 
    try {
        const user = await UserModel.findOne({
            $or:[
                {
                    username: identifier, 
                },
                {
                    email: identifier, 
                }
            ]
        })

        if(!user) { 
            return NextResponse.json({
                success:false, 
                message: "No user found"
            })
        }

        const verifyOtp = parseInt((Math.random() * 900000 ).toString(),10) +100000
        user.otp = verifyOtp; 
        await user.save(); 

        let secret = new TextEncoder().encode(process.env.ACCESS_SECRET)
        const resetToken =  await new SignJWT({data:user._id})
             .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5m') // You can use '10m', '1d', etc.
            .sign(secret)

        const cookieStore = await cookies(); 
        cookieStore.set('resetToken', resetToken ,{
                sameSite:"strict", 
                httpOnly:true,
                secure:true, 
                maxAge: 5*1000 // 3Days 
        })

        return NextResponse.redirect(new URL(`/verify-code/${user.username}`,  req.url))
        

    } catch (error) {
        console.log(`[/api/forgot-password] : Error Submitting the data `)
        return Response.json({
            success: false,
            message: "Some Internal Server Error Occured",
            stacktrace: error
        }, {
            status: 500
        })
    }
}