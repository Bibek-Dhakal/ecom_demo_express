const {EMAIL_USER, EMAIL_PASS} = require('../env');
const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER, // email address
        pass: EMAIL_PASS  // email app password
    }
});