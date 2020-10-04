import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean)=>{
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method:"GET",
        headers:{token: localStorage.token},
      })

      const parseRespone = await response.json();
      // console.log(parseRespone); -> returns true if authenticated

      parseRespone === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    isAuth();
  })

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
