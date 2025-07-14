import dbConnnet from "@/lib/database";
import { NextRequest } from "next/server";
import { UserModel } from "../../../lib/models/UserModel";
import bcyrpt from 'bcrypt';
import { cookies } from "next/headers";
import {SignJWT} from "jose"; 

export async function POST(req:NextRequest){ 

    await dbConnnet(); 
    const { identifier , password } = await req.json(); 

    try {

        const user = await UserModel.findOne({ 
            $or:[
                {email:identifier}, 
                {username:identifier}
            ]
        })

        if(!user){
            return Response.json({
                success:false, 
                message:"You dont have any account, Please register"
            },{
                status:200
            })
        }

        if(user){ 
            const isPasswordCorrect = await bcyrpt.compare(password , user.password)

            if(!isPasswordCorrect){
                return Response.json({
                success:false, 
                message:"Invalid username or password"
                },{
                    status:400
                })
            }

            let secret = new TextEncoder().encode(process.env.ACCESS_SECRET)

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

            const hashedRefToken = await bcyrpt.hash(REFRESH_TOKEN,10); 

            user.refreshToken = hashedRefToken; 
            await user.save()

            const cookieStore = await cookies(); 
            cookieStore.set('refreshToken', hashedRefToken ,{
                sameSite:"strict", 
                httpOnly:true,
                secure:true, 
                maxAge: 2*1000 // 3Days 
            })

            cookieStore.set("accessToken", ACCESS_TOKEN)

            return Response.json({
                success:true, 
                message: "Login Successful", 
                accessToken : ACCESS_TOKEN
            })


        }
        
    } catch (error) {
        console.log(`[/api/login] : Error Submitting the data `)
        return Response.json({
            success:false, 
            message:"Some Internal Server Error Occured",
            stacktrace: error
        },{
            status:500
        })
    }
}