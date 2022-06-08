import { IGrades } from "../features/home/grades/grades.slice";

export const grades : IGrades[] = [
    {
        bottomRange: 0,
        topRange: 49,
        GPA: 0.0,
        grade: 'F'
    },
    {
        bottomRange: 50,
        topRange: 54,
        GPA: 1.0,
        grade: 'D'
    },
    {
        bottomRange: 55,
        topRange: 57,
        GPA: 1.3,
        grade: 'C-'
    },
    {
        bottomRange: 58,
        topRange: 61,
        GPA: 1.7,
        grade: 'C'
    },
    {
        bottomRange: 62,
        topRange: 64,
        GPA: 2.0,
        grade: 'C+'
    },
    {
        bottomRange: 65,
        topRange: 69,
        GPA: 2.7,
        grade: 'B-'
    },
    {
        bottomRange: 70,
        topRange: 74,
        GPA: 3.0,
        grade: 'B'
    },
    {
        bottomRange: 79,
        topRange: 75,
        GPA: 3.3,
        grade: 'B+'
    },
    {
        bottomRange: 80,
        topRange: 84,
        GPA: 3.7,
        grade: 'A-'
    },
    {
        bottomRange: 85,
        topRange: 100,
        GPA: 4.0,
        grade: 'A'
    }
]