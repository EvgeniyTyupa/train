import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    return(
        <Route path={props.path} render={()=>(
            props.isAuth ? props.render()
            : <Redirect to={"/login"}/>
        )}/>
    ); 
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {})(ProtectedRoute);