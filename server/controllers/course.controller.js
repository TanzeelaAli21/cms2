const prisma = require('../getPrisma');
const validateUser = require('../utils/checkAuthorization');
const ErrorResponse = require('../utils/Error');

exports.ViewAllCourses = async (req,res,next) =>{
    try{
        const {role} = req.User;
        if(!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route',401));
        const allCourses = await prisma.course.findMany({
            orderBy: {
                courseName: 'asc'
            }
        });
        res.status(200).json({
            success: true,
            courses: allCourses
        }) 
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message | "server error" 
        })
    }
}

exports.AddCourse = async (req,res,next) =>{
    try{
        const {role} = req.User;
        const {courseId, courseName, creditHours} = req.body;
        if(!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route',401));
        if(!courseId || !courseName || !creditHours )
            next(new ErrorResponse('Enter correct details',400));
        const courseExist = await prisma.course.findUnique({
            where:{
                courseId: courseId
            }
        })
        if(courseExist)
            next(new ErrorResponse("Course Id already exists", 400));
        const createCourse = await prisma.course.create({
            data: {
                courseId,
                courseName,
                creditHours
            }
        })
        console.log(createCourse);
        res.status(201).json({
            success: true,
            message: "course added successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message || "server error" 
        })
    }
}

exports.EditCourse = async (req,res,next) =>{
    try{
        const {role} = req.User;
        const {id,courseId, courseName, creditHours} = req.body;
        if(!validateUser.checkAdmin(role))
            next(new ErrorResponse('Unauthorized route',401));
        if(!id)
            next(new ErrorResponse('NO Course Found',404));
        if(!courseId || !courseName || !creditHours )
            next(new ErrorResponse('Enter correct details',400));
        const updateCourse = await prisma.course.update({
            where: {
                id: id
            },
            data: {
                courseId,
                courseName,
                creditHours
            }
        })
        console.log(updateCourse);
        res.status(201).json({
            success: true,
            message: "course edited successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error" 
        })
    }
}

// exports.DeleteCourse = async (req, res, next) =>{
//     try{
//         const {role} = req.User;
//         if(!validateUser.checkAdmin(role))
//             next(new ErrorResponse('Unauthorized route',401));
//         if(!id)
//             next(new ErrorResponse('NO Course Found',404));
//         const del = prisma.course.delete({
//             where: {
//                 id: id
//             }
//         })
//         console.log(del);
//         res.status(200).json({
//             success: true,
//             message: "course deleted sucessfully"
//         })
//     }catch(error){
//         res.status(500).json({
//             success: false,
//             message: "server error" 
//         })
//     }
// }