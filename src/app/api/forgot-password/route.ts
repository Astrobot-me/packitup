import dbConnnet from "@/lib/database";
import { UserModel } from "@/lib/models/UserModel";
import { NextResponse } from "next/server";


export async function POST (req : Request ){ 
    
    await dbConnnet(); 
    const { identifier,password } = await req.json(); 
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

        

    } catch (error) {
        
    }
}