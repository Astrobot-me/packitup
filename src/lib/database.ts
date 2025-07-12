import mongoose from "mongoose";

const connection = {
    isConnected: false
}

export default async function dbConnnet () : Promise<void>{ 

    if (connection.isConnected){
        console.log("[DATABASE] : @Already Connected to the Database")
        return; 
    }
    try {
        const con = await mongoose.connect(process.env.MONGO_DB_URI || "", {})
        connection.isConnected = con.connections[0].readyState > 0
        console.log(`[DATABASE] : @Connected to the Cluster : ${con.connections[0].host}`)
        console.log(`[DATABASE] : @Connection Object : ${con.connections[0]}`)
    } catch (error) {
        console.log("[DATABASE] : Error Connecting to the database ::dbConnect :: ", error)
        process.exit(1)
    }
}