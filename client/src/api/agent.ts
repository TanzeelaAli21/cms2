import axios, { AxiosResponse, AxiosError } from 'axios';
import { ICourse } from '../features/home/course/course.slice';
import { ISearchValue as studentSearch } from '../features/home/student/ViewStudent';
import {ISearchValue as teacherSearch} from '../features/home/teacher/ViewTecher';
import { ICreateClass } from '../models/class.model';
import { IUser } from '../models/universal.model';
import { INewStudent, INewTeacher} from '../models/user.model';

axios.defaults.baseURL= 'http://localhost:1500/';


const responseBody = (response: AxiosResponse) => response.data;

const responseError = (error: AxiosError) => error.response?.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody).catch(responseError),
    getWithToken: (url: string, token: string) => axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }).then(responseBody).catch(responseError),
    post: (url: string, body: {}) => axios.post(url,body).then(responseBody).catch(responseError),
    postWithToken: (url: string, token: string, body: {}) => axios.post(url,body, { headers: {"Authorization" : `Bearer ${token}`} }).then(responseBody).catch(responseError),
    patchWithToken: (url: string, token: string, body: {}) => axios.patch(url,body, { headers: {"Authorization" : `Bearer ${token}`} }).then(responseBody).catch(responseError), 
}

const auth = {
    login: (loginInfo: IUser) =>  requests.post('/auth/login', {email: loginInfo.email, password: loginInfo.password}),
    getUser: (token: string) => requests.getWithToken('/auth/getUser', token),
    loginOTP: (id: string, otp: string) => requests.post('/auth/loginotp', {id: (+id), otp}),
    sendOTPAgain: (id: string)=> requests.post('/auth/sendOtpAgain', {id: (+id)}),
    forgotPassword: (email: string) => requests.post('/auth/forgotpassword', {email}),
    resetPassword: (password: string, resetToken: string) => requests.post(`/auth/resetPassword/${resetToken}`, {password})
}

const course = {
    getAllCourses: (token: string) => requests.getWithToken('/courses', token),
    addCourse: (token: string, course: ICourse) => requests.postWithToken('/courses', token, course),
    editCourse: (token: string, course: ICourse) => requests.patchWithToken(`/courses/:${course.id}`, token, course)
}

const student = {
    addStudent: (token: string, student: INewStudent) => requests.postWithToken('/student',token, student),
    viewStudent: (token: string, search: studentSearch) => requests.getWithToken(`/student?name=${search.name}&rollNo=${search.rollNo}`,token)
}

const teacher = {
    addTeacher: (token: string, teacher: INewTeacher) => requests.postWithToken('/teacher', token, teacher),
    viewTeacher: (token: string, search: teacherSearch) => requests.getWithToken(`/teacher?name=${search.name}&designation=${search.designation}`,token)
}

const user = {
    changeActive: (token: string, id: number, active: true | false) => requests.patchWithToken('/active',token, { id, active})
}

const classess = {
    createClass: (token: string, constraints: ICreateClass) => requests.postWithToken('/class/create-class',token, constraints),
    getAllClasses: (token: string) => requests.getWithToken('/class/classes', token),
}

const attendence = {
    markAttendence: (token: string, id: number, active: true | false) => requests.postWithToken('/mark-attendence',token, { id, active})
}

export default {
    auth,
    course,
    student,
    teacher,
    user,
    classess,
    attendence
};