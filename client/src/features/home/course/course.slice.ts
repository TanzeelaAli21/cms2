import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import agent from '../../../api/agent';

export const getCoursesAsync = createAsyncThunk('admin/getCourses', async (token: string, {rejectWithValue})=>{
    const response = await agent.course.getAllCourses(token);
    if(response.success){
        // console.log('Ye hu mae',response);
        return response.courses;
    }
    else{
        return rejectWithValue(response.message as string)
    }
})

export interface ICourse {
    id?: number,
    courseId: string,
    courseName: string,
    creditHours: number
}

export interface ICourseState {
    courses: ICourse[],
    isLoading: true | false,
    errorMessage: string
}

const initialState: ICourseState = {
    courses: [],
    isLoading: true,
    errorMessage: ''
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getCoursesAsync.pending, (state)=>({...state, isLoading: true}))
        builder.addCase(getCoursesAsync.rejected, (state, action)=> ({courses: [] , isLoading: false, errorMessage: action.error.message || 'error'}))
        builder.addCase(getCoursesAsync.fulfilled, (state, action)=>({
            courses: action.payload,
            isLoading: false,
            errorMessage: ''
        }))
    }
})

export const {} = courseSlice.actions;

export const getCourseSelector = (state: RootState) => state.course;

export default courseSlice.reducer;