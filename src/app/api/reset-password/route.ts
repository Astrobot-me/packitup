import dbConnnet from "@/lib/database";
import { UserModel } from "@/lib/models/UserModel";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import sendEmail from "@/lib/sendEmail";

export async function POST(req: NextRequest) {

    await dbConnnet();
    try {
        const { identifier, newpassword } = await req.json();
        const resetToken = req.cookies.get("resetToken")?.value 

        if(!resetToken){
            return Response.json({ 
                success:false, 
                message: "Please reinitiate the forgot password flow"
            })
        }


        let secret = new TextEncoder().encode(process.env.ACCESS_SECRET)
        const { payload } = await jwtVerify(resetToken,secret)

        const user = await UserModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        const hashedPassword = await bcrypt.hash(newpassword,10); 
        user.password = hashedPassword
        await user.save(); 

        const emailReciept = await sendEmail({
                    email: user.email, 
                    subject:"Password Has been Reset for your code PackitUp Account",
                    body:`<h1> Recently Your password has been reset at ${new Date().toLocaleDateString()}</h1>`
        })

        req.cookies.clear()

        return Response.json({
            success:true, 
            messsage:"Password has been reset, Please Login"
        },{
            status:200
        })

    } catch (error) {
        console.log(`[/api/reset-password] : Error Submitting the data `)
        return Response.json({
            success: false,
            message: "Some Internal Server Error Occured",
            stacktrace: error
        }, {
            status: 500
        })
    }
}