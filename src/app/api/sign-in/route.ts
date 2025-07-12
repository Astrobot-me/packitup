import dbConnnet from "@/lib/database";
import { NextRequest } from "next/server";
import { UserModel } from "../../../lib/models/UserModel";
import bcyrpt from 'bcrypt';
import jwt from "jsonwebtoken";
import { success } from "zod";
import { cookies } from "next/headers";

export default async function POST(req:NextRequest){ 

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

            const ACCESS_TOKEN =  jwt.sign(
                {
                    data: user._id
                },
                process.env.ACCESS_SECRET || "",
                { expiresIn:"1h" }
            )
            const REFRESH_TOKEN =  jwt.sign(
                {
                    data: user._id
                },
                process.env.ACCESS_SECRET || "",
                { expiresIn:"3d" }
            )

            const hashedRefToken = await bcyrpt.hash(REFRESH_TOKEN,10); 

            user.refreshToken = hashedRefToken; 
            await user.save()

            const cookieStore = await cookies(); 
            cookieStore.set('refreshToken', hashedRefToken ,{
                sameSite:"strict", 
                httpOnly:true,
                secure:true, 
                maxAge: 3*24*60*1000 // 3Days 
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