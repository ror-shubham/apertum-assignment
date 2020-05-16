import React from 'react';
import {Users} from './containers/Users';
import {Login} from './containers/Login';
import './App.css';
import 'element-theme-default';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
