const express = require('express');
const cors = require('cors');
const CourseRouter = require('./routes/course.route');
const AuthRouter = require('./routes/auth.route');
const StudentRouter = require('./routes/student.route');
const TeacherRouter = require('./routes/teacher.route');
const ClassRouter = require('./routes/class.route');
const MarkRouter = require('./routes/markAttendence.route');
const ActiveUser = require('./routes/user.route');
const errorHandler = require('./middleware/error.middleware');
const { protect } = require('./middleware/auth.middleware');
const prisma = require('./getPrisma');

prisma.$connect().then(()=>console.log("connected")).catch(err=> console.log(err));


require('dotenv/config');

const port = process.env.PORT || 1500
const host = process.env.HOST

const app = express();

app.use(express.json())
app.use(cors());

app.get('/', (req,res,next)=> res.json('server is running'))

// auth

app.use('/auth',AuthRouter);

app.use(protect);

app.use('/courses', CourseRouter);
app.use('/student', StudentRouter);
app.use('/teacher', TeacherRouter);
app.use('/active', ActiveUser);
app.use('/class', ClassRouter);
app.use('/attendence', MarkRouter);


// error generic middleware
app.use(errorHandler);

try{
    app.listen(port,host, ()=>{
        console.log(`server is running on ${host}:${port}`);
    })
}catch(err){
    console.log(err.message);
}

process.on("unhandledRejection", (err, promise)=>{
    console.log(`logged error: ${err}`)
})
