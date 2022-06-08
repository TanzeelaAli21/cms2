const prisma = require('../getPrisma');
const validateUser = require('../utils/checkAuthorization');
const ErrorResponse = require('../utils/Error');

exports.ViewTeachers = async (req,res,next) =>{
    try{
        const { name, designation} = req.query;
        const {role} = req.User;
        if(!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route',401));
        const teachers = await prisma.user.findMany({
            where: {
                role: 'TEACHER',
                AND: [
                    {
                        name: {
                            contains: name ? name : ''
                        }
                    },
                    {
                        designation: {
                            startsWith: designation ? designation : ''
                        }
                    }
                ]
            },
            orderBy: {
                name: "asc"
            },
            select: {
                id: true,
                name: true,
                father_name: true,
                DOB: true,
                active: true,
                email: true,
                designation: true,
            }
        });
        res.status(200).json({
            success: true,
            teachers: teachers
        }) 
    }catch(error){
        res.status(500).json({
            success: false,
            message: "server error" 
        })
    }
};

exports.AddTeacher = async (req, res, next) =>{
    try{
        const {role} = req.User;
        if(!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route',401));
        const { name, fatherName, cnic, DOB, email, designation } = req.body;
        if(!name ||  !fatherName ||  !cnic || !DOB || !designation || !email)
            next(new ErrorResponse("invalid information"));
        const checkUser = await prisma.user.findFirst({
            where:{
                OR: [
                    {
                        email: email
                    },
                    {
                        cnic: cnic
                    }
                ]
            }
        })
        if(checkUser)
            next(new ErrorResponse("invalid unique credidentials", 400));
        const addTeacher = await prisma.user.create({
            data: {
                name: name,
                father_name: fatherName,
                cnic: cnic,
                DOB: DOB,
                email: email,
                active: true,
                password: "pucitnc123",
                role: "TEACHER",
                designation: designation,
            }
        })

        res.status(200).json({
            success: true,
            message: "Teacher created successfully"
        })

    }catch(error){
        next(new ErrorResponse(error.message || "server error", 500));
    }
}

exports.EditTeacher = async (req,res,next) =>{
    try{
        
    }catch(error){
        next(new ErrorResponse(error.message || "server error", 500));
    }
}