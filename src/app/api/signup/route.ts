import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { UserModel } from "../../../../models/UserModel";
import bcrypt from 'bcrypt'; 
import sendEmail from "@/lib/sendEmail";
import { success } from "zod";
import dbConnnet from "@/lib/database";

export async function POST(req: Request) { 

    await dbConnnet();

    try {
        const { firstname, lastname, username, email , password } = await req.json() ; 
    
        const existingUsers = await UserModel.findOne({
            $or:[
                {email},
                {username}
            ]
        });
    
        if (existingUsers && existingUsers?.isVerified) { 
            return Response.json({ 
                success:false,
                message:"User already Exists"
            },{
                status:400
            })
        }
    
        const verifyOtp = parseInt((Math.random() * 900000 ).toString(),10) +100000
        const hashedPassword = await bcrypt.hash(password,10); 
    
        if (existingUsers && existingUsers?.isVerified){ 
            existingUsers.verifyOtp = verifyOtp; 
            existingUsers.email = email; 
            
            
            existingUsers.password = hashedPassword
            await existingUsers.save()
    
        }
        
        if(!existingUsers){ 
            const newUser = new UserModel({
                firstname,
                lastname, 
                email,
                username,
                hashedPassword,
                verifyOtp, 
                isVerified:false, 
                orderHistory:[]
            })
            
            await newUser.save(); 
        }
    
        //sending otp email
        
        const emailReciept = await sendEmail({
            otp:verifyOtp,
            email 
        })
        
        if(emailReciept?.success){ 
            return Response.json({
                success:true,
                message:emailReciept.message
            },{
                status:200
            })
        }

        if(!emailReciept?.success){
            return Response.json({
                success:true,
                message:"failed to send verification email"
            },{
                status:501
            })
        }
    
       
    } catch (error) {
        console.log(`[/api/signin] : Error Submitting the data `)
        return Response.json({
            success:false, 
            message:"Some Internal Server Error Occured",
            stacktrace: error
        },{
            status:500
        })  
    }

   
}