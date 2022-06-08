export interface IUserTable {
    id: string,
    firstName: string,
    lastName: string,
    username: string
}

export const userTableHead = ['First Name', 'Last Name', 'Username', 'Actions'];

export const userTableBody: IUserTable[] = [
    {
        id: '1',
        firstName: 'Hamza',
        lastName: 'Ussaid',
        username: 'hamzaussaid9'
    },
    {   
        id: '2', 
        firstName: 'Safi',
        lastName: 'Ullah',
        username: 'helloWorld'
    },
    {
        id: '3',
        firstName: 'Ismail',
        lastName: 'Khokhar',
        username: 'helloworld3'
    },
];

export const degrees = [
    {
        title: "BS Software Engineering",
        value: "BSE"
    },
    {
        title: "BS Computer Science",
        value: "BCS"
    }
];

export const designations = [
    {
        title: "Visiting Faculty",
        value: "Visiting Faculty"
    },
    {
        title: "Lecturer",
        value: "Lecturer"
    },
    {
        title: "Assistant Proffessor",
        value: "Assistant Proffessor"
    },
    {
        title: "Assosiate Proffessor",
        value: "Assosiate Proffessor"
    }
]

export interface INewStudent {
    name: string,
    fatherName: string,
    DOB: Date | null,
    email: string,
    cnic: string,
    degree: string,
    shift: 'M' | 'E'
}

export const StudentTableHead = [
    'picture', 'Full Name', 'Roll No',
    'Email', 'Active', 'Actions'
]

export interface INewTeacher {
    name: string,
    fatherName: string,
    DOB: Date | null,
    email: string,
    cnic: string,
    designation: string
}

export const TeacherTableHead = [
    'picture', 'Full Name', 'Email',
    'designation', 'Active', 'Actions'
]