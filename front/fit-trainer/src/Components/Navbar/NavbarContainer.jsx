import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../Redux/userReducer';
import Navbar from './Navbar';


const NavbarContainer = (props) => {
    useEffect(() => {
        // localStorage.clear()
    },[]);
    return(
        <Navbar email={props.email} logout={props.logout} isAuth={props.isAuth} image={props.image}/>
    );
}

let mapStateToProps = (state) => ({
    email: state.user.email,
    isAuth: state.user.isAuth,
    image: state.user.image
});

export default connect(mapStateToProps, {logout})(NavbarContainer);
