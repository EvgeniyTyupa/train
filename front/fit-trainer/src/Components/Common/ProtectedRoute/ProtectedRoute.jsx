import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getProfile } from '../../../Redux/actions/auth';

const ProtectedRoute = ({Component, isAuth, isStartData, getProfile}) => {
    useEffect(()=>{
        if(localStorage.usertoken && !isStartData){
          getProfile();
        }   
    },[]);
    return(
            isAuth ? <Component/>
            : <Redirect to={"/login"}/>
    ); 
}

let mapStateToProps = (state) => ({
    isStartData: state.user.isStartData,
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {getProfile})(ProtectedRoute);