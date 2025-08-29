import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { UserModel } from "../../../lib/models/UserModel";
import bcrypt from 'bcrypt'; 
import sendEmail from "@/lib/sendEmail";
import { success } from "zod";
import dbConnnet from "@/lib/database";

export async function POST(req: Request) { 

    await dbConnnet();

    try {
        const { firstname, lastname, username, email , password } = await req.json() ; 
        // console.log(firstname,lastname)
        const existingUser = await UserModel.findOne({
            $or:[
                {email},
                {username}
            ]
        });
    
        if (existingUser && existingUser?.isVerified) { 
            return Response.json({ 
                success:false,
                message:"User already Exists"
            },{
                status:400
            })
        }
    
        const verifyOtp = parseInt((Math.random() * 900000 ).toString(),10) +100000
        // console.log(verifyOtp)
        const hashedPassword = await bcrypt.hash(password,10); 
        // console.log(hashedPassword)
    
        if (existingUser && !existingUser?.isVerified){ 
            existingUser.verifyOtp = verifyOtp; 
            existingUser.email = email; 
            existingUser.firstname = firstname; 
            existingUser.lastname = lastname;            
            existingUser.password = hashedPassword;
            await existingUser.save()
    
        }
        
        if(!existingUser){ 
            const newUser = new UserModel({
                firstname : firstname,
                lastname : lastname, 
                email,
                username,
                role:"user",
                password : hashedPassword,
                verifyOtp, 
                isVerified:false, 
                refreshToken : "",
                orderHistory:[]
            })
            
            await newUser.save(); 
        }
    
        //sending otp email
        
        const emailReciept = await sendEmail({
            email, 
            subject:"Verification code from PackitUp",
            body:`<h1>Email: ${email}</h1>\n<h2>Otp: ${verifyOtp}</h1>`
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
                success:false,
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