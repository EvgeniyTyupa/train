import React from 'react';
import classes from './Login.module.css';
import { Field, reduxForm } from "redux-form";


const LoginForm = (props) => {
    return(
        <form>
            <div className={classes.field}>
                
            </div>
        </form>
    )
}




const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        
    }
}