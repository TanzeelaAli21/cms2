const prisma = require("../getPrisma");
const validateUser = require("../utils/checkAuthorization");
const ErrorResponse = require("../utils/Error");
exports.setActive = async (req, res, next) => {
  try {
    const { id, active } = req.body;
    const { role } = req.User;
    if (!validateUser.checkAdmin(role))
      next(new ErrorResponse("Unauthorized route", 401));
    const update = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        active: active,
      },
    });
    res.status(201).json({
      success: true,
      message: "state updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message | "server error",
    });
  }
};

exports.markAttendenceasync = async (req, res, next) => {
  try {
    console.log("inside attendance", req.User);
    const { role } = req.User;
    // const { classId, attendances, date } = req.body;
    const classId = req.body.currentClass.id;
    const date = req.body.date;
    const students = req.body.currentClass.students;
    const presents = req.body.presents;
    var attendances = students.map(person => ({ studentId: person.RollNo, isPresent: presents.indexOf(person.RollNo) !== -1 ? true : false }));

    // const attendances = students.map((stu) => {studentId: stu.RollNo, Present: 1});
     console.log(date, "date ...");
     console.log("classId...", classId); 
     console.log(attendances, "attendances .."); 
    if (!validateUser.checkAdmin(role))
      next(new ErrorResponse('Unauthorized route', 401));
    // if (!validateUser.checkTeacher(role))   
    //     next(new ErrorResponse('Unauthorized route', 401));
    if (!classId || !date)
      next(new ErrorResponse('Enter correct details', 400));
    const create = await prisma.attendanceRecord.create({
      data: {
        classId: parseInt(classId),
        createdAt: date,
      },
    })
    if (create) {
      let result = attendances.map(obj => ({
        ...obj,
        attendanceRecordId: create.id,
        studentId: obj.studentId,
        isPresent: obj.isPresent
      }))
      console.log("......", result);
      const createMany = await prisma.attendance.createMany({
        data: result,
        skipDuplicates: true,
      })
      console.log("attendance records ..", createMany);
      res.status(200).json({
        success: true,
        message: "attendance marked successfully"
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message | "server error"
    })
  }
};
