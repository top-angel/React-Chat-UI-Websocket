import React, { useContext } from 'react';
import history from './history';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { AuthProvider } from './providers/Auth';
import PrivateRoute from './components/PrivateRoute';

import Navv from './components/Navv';
import HomeComponent from './components/Home';
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <div>
          <Navv/>
          <Switch>
            <PrivateRoute exact path="/" component={HomeComponent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
