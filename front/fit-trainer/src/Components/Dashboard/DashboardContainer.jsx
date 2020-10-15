import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';

const DashboardContainer = (props) => {
    return(
        <>
            {props.isAuth && <Dashboard/>}
        </>
        
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {})(DashboardContainer);