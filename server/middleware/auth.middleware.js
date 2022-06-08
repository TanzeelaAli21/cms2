const jwt = require("jsonwebtoken");
const prisma = require('../getPrisma');
exports.protect = async (req, res, next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        res.status(401).json({
            success: false,
            message: "not authorized to this route"
        });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                name: true,
                designation: true,
                email: true,
                role: true
            }
        })

        if(!user){
            res.status(404).json({
                success: false,
                message: "No user found"
            });
        }

        req.User = user;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: "server error"
        })
    }
}