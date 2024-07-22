import mongoose from 'mongoose'
// import dotenv from dotenv;
const ConnectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected Successfully ${conn.connection.host}`);
    }catch(error){
        console.log('Error');
    }


}

export default ConnectDB;