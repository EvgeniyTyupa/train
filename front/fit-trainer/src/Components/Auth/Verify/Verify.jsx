import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import classes from '../Auth.module.css';
import { Field, reduxForm } from "redux-form";
import { Input } from '../../Common/FormsControls/FormsControls';
import { NavLink } from 'react-router-dom';
import WindowHeader from '../../Common/WindowHeader/WindowHeader';
import { required } from '../../../Utils/validators';
import { connect } from 'react-redux';
import { verify } from '../../../Redux/userReducer';
import Preloader from '../../Common/Preloader/Preloader';


class VerifyForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            headerText: "Email verification to finish registration with Fit Trainer App",
            text: "Please, confirm email address",
            email: null
        }
    }
    componentWillMount(){
        const urlParams = new URLSearchParams(window.location.search);
        this.state.email = urlParams.get('email');
        this.props.initialize({emailToVerificate: this.state.email})
    }

    render(){
        if(!this.state.email) return <Redirect to="/login"/>
        return(
            <div className={classes.window}>
                <WindowHeader headerText={this.state.headerText} text={this.state.text}/>
                <form className={classes.form} onSubmit={this.props.handleSubmit}>
                    <div className={classes.field}>
                        <Field component={Input} type="email" name={"emailToVerificate"} disabled
                            validate={[required]}/>
                    </div>
                    <div className={classes.field}>
                        <Field component={Input} type="text" name={"verification_code"}
                            validate={[required]} placeholder="Verification code"/>
                    </div>
                    {this.props.error && 
                    <div className={classes.errorContainer}>
                        <div className={classes.error}>
                            {this.props.error}
                        </div>
                    
                    </div>}
                    <button>VERIFY EMAIL</button>
                    <NavLink to="/login">Already have an account? Sign-in</NavLink>
                </form>
            </div>
        );
    }
    
}

let VerifyReduxForm = reduxForm({form: 'verify'})(VerifyForm);

const Verify = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        props.verify(formData.emailToVerificate, formData.verification_code);
    }
    if(props.isAuth){
        return <Redirect to={"/dashboard"}/>
    }
    if(props.isRedirectAfterSubmit){
        return <Redirect to={"/dashboard"}/>
    }
    return(
        <>
            {props.isFetching && <Preloader/>}
            <div className={classes.main}>
                <h1>Email verification</h1>
                <VerifyReduxForm onSubmit={onSubmit}/>
            </div>
        </>
        
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    isFetching: state.user.isFetching,
    isRedirectAfterSubmit: state.user.isRedirectAfterSubmit
})

export default connect(mapStateToProps, {
    verify
})(Verify);