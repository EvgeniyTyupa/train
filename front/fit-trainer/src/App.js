import React from 'react';
import { Route, Router, BrowserRouter, Switch, Redirect, HashRouter } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar/Navbar';

const App = (props) => {
  return(
    <BrowserRouter>
      <Switch>
        <div className='app'>
          <div className='menu'>
            <Navbar/>
          </div>
          <div className='wrap-content'>
            
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
