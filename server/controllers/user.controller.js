const prisma = require('../getPrisma');
const validateUser = require('../utils/checkAuthorization');
const ErrorResponse = require('../utils/Error');
exports.setActive = async (req, res, next) =>{
    try{
        const { id, active } = req.body;
        const {role} = req.User;
        if(!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route',401));
        const update = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                active: active
            }
        })
        res.status(201).json({
            success: true,
            message: "state updated successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message | "server error" 
        })
    }
}