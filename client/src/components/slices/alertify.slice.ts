import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IAlertify } from '../../models/universal.model';
import type { RootState } from '../../store';

const initialState: IAlertify = {
    message: '',
    open: false,
    severity: 'info',
}


const alertifySlice = createSlice({
    name: 'alertify',
    initialState,
    reducers: {
        createAlert: (state, action: PayloadAction<IAlertify>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
         },
        closeAlert: (state) => {
            state.open = false;
        }
    },
    extraReducers: builder =>{

    }
})


export const {
    createAlert,
    closeAlert
} = alertifySlice.actions;

export const getAlertSelector = (state: RootState) => state.alertify;

export default alertifySlice.reducer;