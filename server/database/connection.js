const mongoose = require('mongoose');
const {MONGO_URI, DB_NAME} = require("../env");

const connectDB = async() =>{
    try{
        const con = await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME,
        });
        console.log(`MongoDB connected : ${con.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;