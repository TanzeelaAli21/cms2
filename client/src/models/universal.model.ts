import { AlertProps } from "@mui/material";

export interface IAlertify {
    message: string,
    open: true | false,
    severity: AlertProps["severity"] 
}

export interface IUser {
    email: string,
    password: string
}

export interface IUserChangepassword {
    password: string,
    confirmPassword: string
}