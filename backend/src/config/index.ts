import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const connect = await mongoose.connect(`${process.env.MANGO_CONNECT_STRING}`);
        console.log("DB", connect.connection.host, connect.connection.name)
    }catch(err: any){
        console.error("Error: ", err)
        process.exit(1)
    }
}