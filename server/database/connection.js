const mongoose = require('mongoose');
const {MONGO_URI} = require("../env");

const connectDB = async() =>{
    try{
        const con = await mongoose.connect(MONGO_URI, {
            dbName: 'ecom-5th-sem',
        });
        console.log(`MongoDB connected : ${con.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;