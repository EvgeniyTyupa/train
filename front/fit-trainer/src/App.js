import React from 'react';
import { Route, Router, BrowserRouter, Switch, Redirect, HashRouter } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import Verify from './Components/Auth/Verify/Verify';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import DashboardContainer from './Components/Dashboard/DashboardContainer';
import ProtectedRoute from './Components/Common/ProtectedRoute/ProtectedRoute';

const App = (props) => {
  return(
    <BrowserRouter>
        <div className='app'>
          <div className='main'>
            <div className='menu'>
              <NavbarContainer/>
            </div>
            <Switch>
              <div className='wrap-content'>
                <Route path="/login" render={()=><Login/>} key={"login"}/>
                <Route path="/register" render={()=><Register/>} key={"register"}/>
                <Route path="/verify" render={()=><Verify/>} key={"verify"}/>
                <Route path="/dashboard" render={()=><DashboardContainer/>} key={"dashboard"}/>
              </div>
            </Switch>
          </div>
          <div className="footer">
            <Footer/>
          </div>
        </div>
    </BrowserRouter>
  )
}

export default App;
