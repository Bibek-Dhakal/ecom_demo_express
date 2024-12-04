module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    EMAIL_USER: process.env.EMAIL_USER || 'defaultuser@example.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'defaultpassword',
    WEBSITE_NAME: process.env.WEBSITE_NAME || 'Ecommerce BCA 5th Sem',
    WEBSITE_URL: process.env.WEBSITE_URL || 'http://localhost:3000',
    KHALTI_PAYMENT_RETURN_URL: process.env.KHALTI_PAYMENT_RETURN_URL || this.WEBSITE_URL + '/verify-payment',
};