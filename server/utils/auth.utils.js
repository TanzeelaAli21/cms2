const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.checkString = async (password, userPassword) => await bcrypt.compare(password, userPassword);

exports.hashString = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt);
    return hashedPassword;
}

exports.getResetPasswordURL = async () => await crypto.randomBytes(20).toString("hex");