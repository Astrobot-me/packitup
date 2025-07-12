import dbConnnet from "@/lib/database";
import { UserModel } from "../../../../models/UserModel";
import { success } from "zod";
import { NextRequest } from "next/server";


type ParamProps = {
    params: Promise<{ username: string }>
}

export default async function POST({
    params
}: ParamProps, req: NextRequest) {

    await dbConnnet();
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

        const isCorrect = user.verifyOtp === otp;

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