import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { StateType } from './reducers';
import { Dashboard } from './screens/Dashboard';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';

export const App: React.FC = () => {
  const authenticated = useSelector((state: StateType) => state.authenticated);

  return (
    <Router>
      <div className="app">
        {authenticated ? (
          <Dashboard />
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <SignIn />
            </Route>
          </Switch>
        )}
        <ToastContainer />
      </div>
    </Router>
  );
};
