import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import agent from '../../../api/agent';
import { ISearchValue } from './ViewTecher';

interface IgetParams {
    token: string,
    search: ISearchValue
}

export const getTeachersAsync = createAsyncThunk('admin/getTeachers', async (params: IgetParams, {rejectWithValue})=>{
    const response = await agent.teacher.viewTeacher(params.token, params.search);
    console.log('teacher response', response);
    if(response.success)
        return response.teachers
    else{
        console.log("teachers redux error");
        return rejectWithValue(response.message as string)
    }
})

export interface ITeacher {
    id: number,
    name: string,
    father_name: string,
    cnic: string,
    DOB: Date,
    active: boolean,
    email: string,
    designation: string
}

export interface ITeachersState {
    teachers: ITeacher[],
    isLoading: true | false,
    errormessage: string
}

const initialState:ITeachersState = {
    teachers: [],
    isLoading: false,
    errormessage: ''
}

const teacherSlice = createSlice({
    name: "teachers",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getTeachersAsync.pending, (state)=>({...state, isLoading: true}))

        builder.addCase(getTeachersAsync.rejected, (state, action)=> ({teachers: [], isLoading: false, errormessage: action.error.message || 'error' }))

        builder.addCase(getTeachersAsync.fulfilled, (state, action)=>(
            {
                teachers: action.payload,
                isLoading: false,
                errormessage: ''
            }
        ))
    }
})

export const {

} = teacherSlice.actions;

export const getTeacherSelector = (state: RootState) => state

export default teacherSlice.reducer;