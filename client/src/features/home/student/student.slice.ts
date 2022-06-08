import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import { ISearchValue } from './ViewStudent';
import agent from '../../../api/agent';

interface IgetParams {
    token: string,
    search: ISearchValue
}

export const getStudentsAsync = createAsyncThunk('admin/getStudents', async (params: IgetParams , {rejectWithValue})=>{
    const response = await agent.student.viewStudent(params.token, params.search);
    console.log('student response', response);
    if(response.success)
        return response.students
    else{
        console.log("students redux error");
        return rejectWithValue(response.message as string)
    }
})

export interface IStudent {
    id: number,
    name: string,
    father_name: string,
    cnic: string,
    DOB: Date,
    active: boolean,
    email: string,
    RollNo: true
}

export interface IStudentsState {
    students: IStudent[],
    isLoading: true | false,
    errorMessage: string
}

const initialState: IStudentsState = {
        students: [],
        isLoading: false,
        errorMessage: ''
}

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getStudentsAsync.pending, (state)=>({...state, isLoading: true}))

        builder.addCase(getStudentsAsync.rejected, (state, action)=> ({students: [], isLoading: false, errorMessage: action.error.message || 'error'}))

        builder.addCase(getStudentsAsync.fulfilled, (state, action)=>(
            {
                students: action.payload,
                isLoading: false,
                errorMessage: ''
            }
        ))
    }
})

export const { 

} = studentSlice.actions;

export const getStudentSelector = (state: RootState) => state.students;

export default studentSlice.reducer;