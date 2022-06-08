import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'; 
import type { RootState } from '../../store';
import agent from '../../api/agent';


export const loginAsync = createAsyncThunk('auth/login/getUser', async (token: string, {rejectWithValue})=>{
        const response = await agent.auth.getUser(token);
        console.log('auth response',response);
        if(response.success){
            return response.user
        }
        else{
            console.log('token removed from thunk');
            localStorage.removeItem('token');
            return rejectWithValue(response.message as string );
        }
})

export interface IUserInfo {
    id: number,
    name: string,
    father_name: string,
    email: string,
    cnic: string,
    password: string,
    RollNo: string | null
    DOB: Date
    role: 'ADMIN' | 'STUDENT' | 'TEACHER'
    shift: 'M' | 'E',
    designation: string | null
}

interface IAuthState {
    isLoggedIn: true | false,
    isLoading: true | false,
    errorMessage: string,
    user: IUserInfo | null
}

const initialState :IAuthState ={
    isLoggedIn: false,
    isLoading: true,
    errorMessage: '',
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state)=>{
            localStorage.removeItem('token');
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: builder =>{
        builder.addCase(loginAsync.pending, (state)=>({...state, isLoading: true}))

        builder.addCase(loginAsync.rejected, (state, action) => {
            return{
                ...state,
                isLoading: false,
                errorMessage: action.error.message || 'error',
                user: null,
                isLoggedIn: false
            }
    })

        builder.addCase(loginAsync.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            isLoggedIn: true,
            errorMessage: '',
            user: (action.payload as unknown) as IUserInfo
        }))
    }
})

export const {
    logout
} = authSlice.actions;

export const getAuthSelector = (state: RootState) => state.auth

export default authSlice.reducer;