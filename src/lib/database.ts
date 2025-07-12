import mongoose from "mongoose";

const connection = {
    isConnected: 0 
}

export default async function dbConnnet () : Promise<void>{ 

    if (connection.isConnected){
        console.log("[DATABASE] : @Already Connected to the Database")
        return; 
    }
    try {
        const con = await mongoose.connect(process.env.MONGO_DB_URI || "", {})
        connection.isConnected = con.connections[0].readyState
        console.log(`[DATABASE] : @Connected to the Cluster : ${con.connections[0].host}`)
    } catch (error) {
        console.log("[DATABASE] : Error Connecting to the database ::dbConnect :: ", error)
        process.exit()
    }
}