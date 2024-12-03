module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'mydatabase',
    EMAIL_USER: process.env.EMAIL_USER || 'defaultuser@example.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'defaultpassword',
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'defaultKeyId',
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'defaultKeySecret',
};