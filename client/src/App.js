import React, {Fragment, useState} from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean)=>{
    setIsAuthenticated(boolean);
  }

  return (
  <Fragment>
    <Router>
      <div className="container">
      <Switch>
          <Route exact path='/login' render = {props=> isAuthenticated ? (<Redirect to= "/dashboard" />): (<Login{...props} setAuth = {setAuth}/>)  }/>
          <Route exact path='/register' render = {props => isAuthenticated ? (<Redirect to ="/login" />): ( <Register{...props} setAuth = {setAuth}/>)} />
          <Route exact path='/dashboard' render = {props=> isAuthenticated ? <Dashboard{...props} setAuth = {setAuth}/> : <Redirect to ="/login" />}/>
        </Switch>
      </div>
    </Router>
  </Fragment>
  );
}

export default App;
