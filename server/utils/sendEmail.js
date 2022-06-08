const nodemailer = require("nodemailer");

require('dotenv').config();

const sendEmail = async (options) =>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: `${process.env.EMAIL_USERNAME}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });
    
const mailOptions = {
    from: `${process.env.EMAIL_FROM}`,
    to: options.to,
    subject: options.subject,
    html: options.text
}

transporter.sendMail(mailOptions, function (err, info){
    if(err){
        console.log(err);
    }
    else{
        console.log(info);
    }
})
}

module.exports = sendEmail;