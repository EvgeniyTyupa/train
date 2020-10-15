import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../Redux/userReducer';
import Navbar from './Navbar';


const NavbarContainer = (props) => {
    useEffect(() => {
        // localStorage.clear()
    })
    let email = null;
    if(props.userData) email = props.userData.email;
    return(
        <Navbar email={email} logout={props.logout} isAuth={props.isAuth}/>
    );
}

let mapStateToProps = (state) => ({
    userData: state.user.userData,
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {logout})(NavbarContainer);
