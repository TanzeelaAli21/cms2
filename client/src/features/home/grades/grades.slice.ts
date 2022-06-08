import { createSlice } from '@reduxjs/toolkit'; 
import { grades } from '../../../models/grades.model';
import type { RootState } from '../../../store';



export interface IGrades {
    bottomRange: number,
    topRange: number,
    grade: string,
    GPA: number
}



const initialState: IGrades[]  = grades;


const gradeSlice = createSlice({
    name: 'grade',
    initialState,
    reducers: {

    },
    extraReducers: builder =>{

    }

})

export const {

} = gradeSlice.actions;

export const getGradeSelector = (state: RootState) => state.grade;

export default gradeSlice.reducer;