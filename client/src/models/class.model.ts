export interface ICreateClass {
    courseId: number,
    teacherId: number,
    students: number[],
    
}

// export interface IClassTable {
//      id: string,
//     courseId: string,
//     course: string,
//     teacherId: string,
//     teacher: string,
//     studentIds: string,
//     students: string,
// }

export const classTableHead = ['Class ID', 'Course ID', 'Course Name', 'Actions'];