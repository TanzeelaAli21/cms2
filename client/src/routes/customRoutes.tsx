import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import AuthLayout from '../features/layout/AuthLayout';
import Login from '../features/auth/Login';
import Layout from '../features/layout/Layout';
import Home from '../features/home/Home';
import Profile from '../features/home/profile/Profile';
import ResetPassword from '../features/auth/ResetPassword';
import LoginOTP from '../features/auth/LoginOTP';
import ForgotPassword from '../features/auth/ForgotPassword';
import PageNotFound from '../features/home/PageNotFound';
import ViewCourse from '../features/home/course/ViewCourses';
import AddCourse from '../features/home/course/AddCourse';
import EditCourse from '../features/home/course/EditCourse';
import Grades from '../features/home/grades/Grades';
import AddStudent from '../features/home/student/AddStudent';
import ViewStudent from '../features/home/student/ViewStudent';
import AddTeacher from '../features/home/teacher/AddTeacher';
import ViewTecher from '../features/home/teacher/ViewTecher';
import CreateClass from '../features/home/class/CreateClass';
import Attendence from '../features/home/attendence/Attendence';
import ViewClasses from '../features/home/class/ViewClasses';
const CustomRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-otp" element={<LoginOTP />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                </Route>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/courses" element={<ViewCourse />} />
                    <Route path="/courses/add" element={<AddCourse />} />
                    <Route path="/courses/:id" element={<EditCourse />} />
                    <Route path="/grading" element={<Grades />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/view-student" element={<ViewStudent />} />
                    <Route path="/add-teacher" element={<AddTeacher />} />
                    <Route path="/view-teacher" element={<ViewTecher />} />
                    <Route path="/create-class" element={<CreateClass />} />
                    <Route path="/view-class" element={<ViewClasses />} />
                    <Route path="/mark-attendence" element={<Attendence />} />
                    <Route path="/not-found" element={<PageNotFound />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default CustomRoutes;
