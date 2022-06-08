const prisma = require('../getPrisma');
const ErrorResponse = require('../utils/Error');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const { getResetPasswordURL, hashString, checkString  } = require('../utils/auth.utils');


// const ExpireOTP = async (userId) =>{
//     await prisma.user.update({
//         where: {
//             id: userId
//         },
//         data: {
//             otp: null
//         }
//     })
// }

exports.Login = async (req, res, next) =>{
    try{
    const info = {
        email: req.body.email,
        password: req.body.password
    }
    if(!info.email || !info.password){
        return next(new ErrorResponse("please provide an email and password", 400));
    }
    const user = await prisma.user.findUnique({
        where: {
            email: info.email,
        }
    })
    if(!user)
        return next(new ErrorResponse("No user found", 404))

    if(!user.active)
        return next(new ErrorResponse("User not active, contact Admin", 400));
    
    const passwordIsMatched = await checkString(info.password, user.password);
    if(!passwordIsMatched){
        return next(new ErrorResponse("Enter correct credidentials",404));
    }
        try {
            const OTP = crypto.randomBytes(3).toString("hex");
            console.log(OTP);
            sendEmail({
                to: user.email,
                subject: "login OTP",
                text: `Your login OTP is ${OTP}`
            })
            const update = await prisma.user.update({
                where:{
                    id: user.id
                },
                data: {
                    otp: await hashString(OTP)
                }
            })
            const data = {
                id: user.id
            } 
            res.status(200).json({
                data,
                success: true,
                message: "OTP send successfully"
    })       
        } catch (error) {
            return next(new ErrorResponse("mail not sent",401));
        }
    }
    catch(error){
        return next(new ErrorResponse(error.message,500));
    }
}

exports.LoginOTP = async (req, res, next) =>{
    try{
        const userId = req.body.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        console.log(user, userId);
        if(!user){
            return next(new ErrorResponse("no user found", 404));
        }
        if(user.otp === null)
            return next(new ErrorResponse("no OTP found"), 400);
        if(!(await checkString(req.body.otp,user.otp))){
            return next(new ErrorResponse("Wrong OTP", 401));
        }
        const token = jwt.sign({id: userId},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRE
        })
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                otp: null
            }
        })
        res.status(200).json({
            token,
            success: true,
            message: "Login Successful"
        });
    }
    catch(error){
        return next(new ErrorResponse(error.message,500));
    }
}

exports.ForgotPassword = async (req, res, next) =>{
   try{
    const {email} = req.body;
    if(!email)
        return next(new ErrorResponse("please provide an email", 400));
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user)
        return next(new ErrorResponse("no User found", 404));
    const resetToken = await getResetPasswordURL();
    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go with this link to reset the password</p>
    <a href=${resetURL} clicktracking=off >${resetURL}</a>
    `;
    const saveResetToken = await crypto.createHash("sha256").update(resetToken).digest("hex");

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            resetToken: saveResetToken
        }
    })
    try{
        sendEmail({
            to: user.email,
            subject: "Reset Password Link",
            text: message
        })
        res.status(201).json({
            success: true,
            message: "reset Link has been sent"
        })
    }catch(error){
        return next(new ErrorResponse(error.message,500));
    }
    
   }catch(error){
       return next(new ErrorResponse(error.message,500))
   }
}

exports.resetPassword =  async (req, res, next) =>{
   try{
    const {password} = req.body;
    if(!password)
        return next(new ErrorResponse("Give some password"), 400);
    const resetToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    const user = await prisma.user.findUnique({
        where: {
            resetToken: resetToken,        
        }
    })
    if(!user)
        return next(new ErrorResponse("invalid user, try sending reset link again", 404));

    if((await checkString(password, user.password)))
        return next(new ErrorResponse("Enter new password, password can not be previous one", 401));
        if(!(await checkString(password, user.password)))
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: await hashString(password),
                resetToken: null
            }
        });
    res.status(200).json({
        success: true,
        message: "password saved successfully"
    })
   }catch(error){
       next(new ErrorResponse(error.message, 500));
   }
}

exports.getUser = async (req, res, next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        res.status(401).json({
            success: false,
            message: "No User found"
        });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                name: true,
                father_name: true,
                email: true,
                cnic: true,
                password: true,
                RollNo: true,
                DOB: true,
                role: true,
                shift: true,
                designation: true,
            }
        })
        console.log(user);

        if(!user){
            res.status(404).json({
                success: false,
                message: "No User found"
            });
        }

        res.status(200).json({
            user: user,
            success: true
        })

    } catch (error) {
        return next(new ErrorResponse("Token error",400));
    }
}

exports.sendOTPAgain = async (req,res,next)=>{
    try{
        const {id} = req.body;
        const user = await prisma.user.findUnique({
            where:{
                id: id
            }
        })
        if(!id || !user)
            next(new ErrorResponse("No User is found"), 404);
        try {
            const OTP = crypto.randomBytes(3).toString("hex");
            sendEmail({
                to: user.email,
                subject: "login OTP",
                text: `Your login OTP is ${OTP}`
            })
            await prisma.user.update({
                where:{
                    id: user.id
                },
                data: {
                    otp: await hashString(OTP)
                }
            })
            res.status(200).json({
                success: true,
                message: "OTP sent successfully"
            }) 
        } catch (error) {
            next(new ErrorResponse("mail not send",401));
        }
    }catch(error){
        next(new ErrorResponse(error.message,500));
    }
}