import React from 'react';
import classes from '../../Common/Form.module.css';
import { Field, reduxForm } from "redux-form";
import { Redirect, Route } from 'react-router';
import { Input } from '../../Common/FormsControls/FormsControls';
import { required, minPassCreator, isEmail } from '../../../Utils/validators';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import WindowHeader from '../../Common/WindowHeader/WindowHeader';
import { login, setIsRedirectAfterSubmit } from '../../../Redux/userReducer';
import Preloader from '../../Common/Preloader/Preloader';

const minPassLength3 = minPassCreator(3);

const LoginForm = (props) => {
    let headerText = "Sign into Fit Trainer App";
    let text = "Please, enter your email and password";

    return(
        <div className={classes.window}>
            <WindowHeader headerText={headerText} text={text}/>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <div className={classes.field}>
                    <Field component={Input} placeholder="Email address" type="email" name={"email"} 
                        validate={[required, isEmail]}/>
                </div>
                <div className={classes.field}>
                    <Field component={Input} placeholder="Password" type="password" name={"password"} 
                        validate={[required]}/>
                </div>
                
                {props.error && 
                    <div className={classes.errorContainer}>
                        <div className={classes.error}>
                            {props.error}
                        </div>
                    
                    </div>}
                <button>SIGN IN</button>
                <NavLink to="/register">First time user? Sign-up!</NavLink>  
            </form>
        </div>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
    }
    if(props.isAuth){
        return <Redirect to={"/dashboard"}/>
    }
    return(
        <>
            {props.isFetching && <Preloader/>}
            <div className={classes.main}>
                <h1>Sign in</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </>
        
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    isFetching: state.user.isFetching,
});

export default connect(mapStateToProps, {
    login,
})(Login);