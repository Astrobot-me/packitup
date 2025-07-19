import { UserModel } from "@/lib/models/UserModel";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import dbConnnet from "@/lib/database";


export async function POST(req:NextRequest) {

    await dbConnnet();
    console.log("Request Recieved")
    try {
   
        const accessToken = req.cookies.get("accessToken")?.value 
        let secret = new TextEncoder().encode(process.env.ACCESS_SECRET)

        if(!accessToken) { 
            return Response.json({ 
                success:false, 
                message:"User is not Logged In"
            },{ 
                status: 403
            })
        }
        
        try {
            await jwtVerify(accessToken.toString(), secret)
            return Response.json({ 
                success:true, 
                message:"User is already Logged"
            },{ 
                status:200
            }) 
        } catch (error) {
            //continue
        }


        const refToken = req.cookies.get("refreshToken")?.value
        if(!refToken) return Response.json({
            success:false, 
            message:"Unauthorized Access"
        }, {
            status:403
        })
        
        secret = new TextEncoder().encode(process.env.REFRESH_SECRET)

        let userid; 
        try {
            const { payload } = await jwtVerify(refToken.toString(),secret);
            userid = payload.data
        } catch (error) {
            return Response.json({ 
                success:false, 
                message: " Invalid Tokens , please login again"
            },{
                status: 403
            })
        } 

        const user = await UserModel.findById(userid); 
        
        if(!user) { 
            return Response.json({
                success:false, 
                message:"Invalid User"
            },{
                status:404
            })
        }

        const isTokenSame = await bcrypt.compare(refToken.toString(), user.refreshToken)

        if(!isTokenSame){ 
            user.refreshToken = null; 
            await user.save(); 
            return Response.json({
                success:false, 
                message:"Your Security has been comprimised, Please reset your password"
            },{
            status: 400
            })
        }

        secret = new TextEncoder().encode(process.env.ACCESS_SECRET)
        
        const ACCESS_TOKEN =  await new SignJWT({data:user._id})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1m') // You can use '10m', '1d', etc.
        .sign(secret)
                    
        secret = new TextEncoder().encode(process.env.REFRESH_SECRET)

        const REFRESH_TOKEN =   await new SignJWT({data:user._id})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2m') // You can use '10m', '1d', etc.
        .sign(secret)


        const hashedToken = await bcrypt.hash(REFRESH_TOKEN, 10)
        user.refreshToken = hashedToken; 
        await user.save(); 
        
        const cookieStore = await cookies(); 
        cookieStore.set('refreshToken', REFRESH_TOKEN ,{
            sameSite:"strict", 
            httpOnly:true,
            secure:true, 
            maxAge: 2*60*1000 // 3Days 
        })
        
        cookieStore.set("accessToken", ACCESS_TOKEN)

        return Response.json({
            success:true, 
            message: "token successfully recycled", 
            accessToken : ACCESS_TOKEN
        },{
            status: 200
        })
        

    } catch (error) {
        return Response.json({
            success:false, 
            message: "Some Internal Server Error Occured"
        }, { 
            status:500
        })
    }
}