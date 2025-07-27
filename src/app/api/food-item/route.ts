import { auth } from "@/lib/auth";
import dbConnnet from "@/lib/database";
import { NextResponse } from "next/server";
import { FoodModel } from "@/lib/models/FoodModel";

export const GET = auth(async function GET(req) {
    if (!req.auth) return NextResponse.json({
        success: false,
        message: "Not authenticated"
    }, { status: 401 })

    await dbConnnet();

    try {
        const foodItems = await FoodModel.find({
            isAvailable:"available"
        }).sort({
            updatedAt:-1
        })

        if(foodItems.length == 0 ) return NextResponse.json({ 
            success:false, 
            message:"No Food Items Available"
        }, {
            status: 404
        })

        return NextResponse.json({ 
            success:true, 
            data: foodItems, 
            message:"Food Data Successfully Fetched"
        })
    } catch (error) {
        console.log(`[/api/food-item] : Error Submitting the data `)
        return NextResponse.json({
            success: false,
            message: "Some Internal Server Error Occured",
        }, {
            status: 500
        })
    }
})

export const POST = auth(async function POST(req) {
    if (!req.auth) return NextResponse.json({
        success: false,
        message: "Not authenticated"
    }, { status: 401 })

    await dbConnnet();
    try {

        const body = await req.json();
        const fooditem = await FoodModel.create({
            ...body,
            isAvailable: "available"
        })
        await fooditem.save()

        return NextResponse.json({
            success: true,
            message: "Food Item Successfully Added"
        })

    } catch (error) {
        console.log(`[/api/food-item] : Error Submitting the data `)
        console.log("[Error Object]")
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Some Internal Server Error Occured",
        }, {
            status: 500
        })
    }
})