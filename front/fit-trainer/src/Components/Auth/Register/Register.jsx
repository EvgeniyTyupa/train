import React from 'react';
import classes from '../../Common/Form.module.css';
import { Field, reduxForm } from "redux-form";
import { Redirect, Route } from 'react-router';
import { Input } from '../../Common/FormsControls/FormsControls';
import { required, minPassCreator, isEmail, passValidationMatch } from '../../../Utils/validators';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import WindowHeader from '../../Common/WindowHeader/WindowHeader';
import { register } from '../../../Redux/actions/auth';
import Preloader from '../../Common/Preloader/Preloader';
import ModalAfterSubmit from '../../Common/Modals/ModalAfterSubmit';

const minPassLength3 = minPassCreator(3);

const RegisterForm = (props) => {
    let headerText = "Register with Fit Trainer App";
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
                        validate={[required, minPassLength3]}/>
                </div>
                <div className={classes.field}>
                    <Field component={Input} placeholder="Repeat password" type="password" name={"confirmpassword"} 
                        validate={[required, passValidationMatch]}/>
                </div>
                {props.error && 
                    <div className={classes.errorContainer}>
                        <div className={classes.error}>
                            {props.error}
                        </div>
                    
                    </div>}
                <button>SIGN UP</button>
                <NavLink to="/login">Already have an account? Sign-in</NavLink>
            </form>
        </div>
    );
}




const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm);

const Register = (props) => {
    const onSubmit = (formData) => {
        props.register(formData.email, formData.password);
    }
    if(props.isAuth){
        return <Redirect to={"/dashboard"}/>
    }
    return(
        <>
            {props.isFetching && <Preloader/>}
            {props.isShowModal && <ModalAfterSubmit text={props.serverMessage}/>}
            <div className={classes.main}>
                <h1>Sign in</h1>
                <RegisterReduxForm onSubmit={onSubmit}/>
            </div>
        </> 
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    isFetching: state.common.isFetching,
    isShowModal: state.common.isShowModal,
    serverMessage: state.common.serverMessage
});

export default connect(mapStateToProps, {register})(Register);