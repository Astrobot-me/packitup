import dbConnnet from "@/lib/database";
import { UserModel } from "../../../lib/models/UserModel";
import { success } from "zod";
import { NextRequest } from "next/server";


type ParamProps = {
    params: Promise<{ username: string }>
}

export async function POST( req: NextRequest) {

    await dbConnnet();
    console.log(req)
    const { username, otp } = await req.json();
    try {
        const user = await UserModel.findOne({
            username
        })

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found! Please Register"
            }, {
                status: 400
            })
        }

        const isCorrect = parseInt(user.verifyOtp) === parseInt(otp);

        const isCodeValid = (new Date().getTime() - new Date(user.updatedAt).getTime()) < 2 * 60 * 1000;

        if (!isCodeValid) {
            return Response.json({
                success: false,
                message: "Verification code is Expired"
            }, {
                status: 400
            })
        }

        else if (isCodeValid) {
            if (isCorrect) {
                user.isVerified = true; 
                await user.save();
                return Response.json({
                    success: true,
                    message: "User Verified Successfuly"
                }, {
                    status: 200
                })
                 
            } else {
                return Response.json({
                    success: false,
                    message: "Incorrect Otp"
                }, {
                    status: 200
                })
            }
        }

    } catch (error) {
        console.log(`[/api/verify-user] : Error Submitting the data `)
        return Response.json({
            success: false,
            message: "Some Internal Server Error Occured",
            stacktrace: error
        }, {
            status: 500
        })
    }
}