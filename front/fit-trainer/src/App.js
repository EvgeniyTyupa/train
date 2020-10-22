import React, { useEffect } from 'react';
import { Route, Router, BrowserRouter, Switch, Redirect, HashRouter } from "react-router-dom";
import './App.css';
import history from './Utils/history';
import Footer from './Components/Footer/Footer';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import Verify from './Components/Auth/Verify/Verify';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import DashboardContainer from './Components/Dashboard/DashboardContainer';
import ProtectedRoute from './Components/Common/ProtectedRoute/ProtectedRoute';
import AddExercise from './Components/Exercise/AddExercise';
import AddWorkoutContainer from './Components/Workout/AddWorkout/AddWorkoutContainer';
import EditExercisesContainer from './Components/Exercise/EditExercises.jsx/EditExercisesContainer';
import EditWorkoutContainer from './Components/Workout/EditWorkout/EditWorkoutContainer';
import { connect } from 'react-redux';
import { getProfile } from './Redux/userReducer';

const App = (props) => {
  useEffect(()=>{
    if(localStorage.usertoken && !props.isStartData){
      props.getProfile();
    }   
  },[]);
  return(
    <Router history={history}>
        <div className='app'>
          <div className='main'>
            <div className='menu'>
              <NavbarContainer/>
            </div>
            <Switch>
              <div className='wrap-content'>
                <Route exact path="/login" render={()=><Login/>} key={"login"}/>
                <Route exact path="/register" render={()=><Register/>} key={"register"}/>
                <Route exact path="/verify" render={()=><Verify/>} key={"verify"}/>
                <Route exact path="/dashboard" render={()=><ProtectedRoute Component={DashboardContainer} key={"dashboard"} isAuth={props.isAuth}/>}/>
                <Route exact path="/addex" render={()=><ProtectedRoute Component={AddExercise} key={"addex"} isAuth={props.isAuth}/>}/>
                <Route exact path="/editex" render={()=><ProtectedRoute Component={EditExercisesContainer} key={"editex"} isAuth={props.isAuth}/>}/>
                <Route exact path="/addwork/:date?" render={()=><ProtectedRoute Component={AddWorkoutContainer} key={"addwork"} isAuth={props.isAuth}/>}/>
                <Route exact path="/editwork/:workoutId?" render={()=><ProtectedRoute Component={EditWorkoutContainer} key={"editwork"} isAuth={props.isAuth}/>}/>
              </div>
            </Switch>
          </div>
          <div className="footer">
            <Footer/>
          </div>
        </div>
    </Router>
  )
}

let mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  isStartData: state.user.isStartData
})

export default connect(mapStateToProps, {
  getProfile
})(App);
