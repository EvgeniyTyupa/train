import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({Component, isAuth}) => {
    return(
            isAuth ? <Component/>
            : <Redirect to={"/login"}/>
    ); 
}

let mapStateToProps = (state) => ({
    isStartData: state.user.isStartData,
});

export default connect(mapStateToProps, null)(ProtectedRoute);