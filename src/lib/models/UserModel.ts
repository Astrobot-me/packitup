import mongoose, { Document } from 'mongoose'


export type Order = Document & { 
    orderAmount: number; 
    orderItems: [string];
    timestamps: Date; 
}

type User =  Document & { 
    firstname:string;
    lastname:string;
    username:string; 
    email:string; 
    password:string; 
    refreshToken:string
    orderHistory : Order[];
    isVerified:boolean; 
    verifyOtp:number
}

const OrderSchema = new mongoose.Schema({
    orderAmount: {
        type: Number,
        required: [true, "OrderAmount field is required"]
    }, 
    orderItems: {
        type: [String]
    },
    timestamps: {
        type: Date,
        required: [true, "Order timestamps is a required field"]   
    }
},
{
    timestamps:true
})

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true, 
        trim:true
    },
    lastname:{
        type:String,
        required:true, 
        trim:true
    },
    username : { 
        type:String,
        required:true, 
        min:[4, "Username is too short"],
        unique:[true,"Username already exists"], 
        trim:true
    }, 
    email : {
        type:String, 
        required:true,
        unique:[true,"Email already exists "],
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"Input email is of Invalid format"]
    },
    password: { 
        type:String, 
        required:[true,"password is required field"]
    },
    role : { 
        type:String,
        required: [true, "role is required"]
    },
    refreshToken: { 
        type:String, 
    },
    orderHistory: [OrderSchema], 
    isVerified:{
        type: Boolean,
    }, 
    verifyOtp:{ 
        type:Number
    }
   
},{
    timestamps:true
})

export const UserModel = mongoose.models.user || mongoose.model("user",userSchema)