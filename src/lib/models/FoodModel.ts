import mongoose, { Document } from 'mongoose'


type FoodCategory = "all"| "pizza"| "burgers"| "asian"| "salads"| "desserts" | "beverages";

interface FoodItem extends Document{
    id: string;
    name: String;
    description: string,
    price: string,
    image: string;
    rating: number,
    category: string,
    isAvailable: string; 
} 


const foodSchema = new mongoose.Schema<FoodItem>({ 
    id: {
        type: String
    }, 

    name: {
        type:String
    }, 
    description: {type:String},
    price: {type:String},
    image: {type:String},
    rating: {type:Number},
    category: {
        type: String,
        enum: ["all", "pizza", "burgers", "asian", "salads", "desserts", "beverages"],
        required: true,
    },
    isAvailable: {
        type: String,
        enum: ["available","soldout"],
        required: true,
    }
}, {
    timestamps:true
})


export const FoodModel = mongoose.models.food || mongoose.model("food", foodSchema)