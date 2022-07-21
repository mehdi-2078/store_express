const mongoose = require("mongoose");
const createError = require("http-errors");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/store_test", (error) => {
            if (error) console.log(error)
            return console.log('db connected successfully')
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
