import React, { useEffect } from 'react';
import { Alert, Slide, SlideProps, Snackbar, AlertProps } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { closeAlert } from './slices/alertify.slice';

export interface IAlertifyProps {
    open: boolean,
    handleClose: ()=> void,
    severity: AlertProps["severity"],
    message: string
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
  }

const Alertify:React.FC = () => {
    const alertify = useAppSelector(state=> state.alertify);
    const dispatch = useAppDispatch();
    return (
        <Snackbar
            open={alertify.open}
            onClose={()=>dispatch(closeAlert())}
            transitionDuration={500}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            TransitionComponent={SlideTransition}>
                <Alert severity={alertify.severity} onClose={()=>dispatch(closeAlert())} sx={{ width: '100%' }}>
                    {alertify.message}
                </Alert>
            </Snackbar>
    )
}

export default Alertify;
