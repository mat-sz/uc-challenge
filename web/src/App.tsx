import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { StateType } from './reducers';
import { Dashboard } from './screens/Dashboard';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

export const App: React.FC = () => {
  const authenticated = useSelector((state: StateType) => state.authenticated);

  return (
    <Router>
      <Wrapper>
        {authenticated ? (
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route>
              <Redirect to="/signin" />
            </Route>
          </Switch>
        )}
        <ToastContainer />
      </Wrapper>
    </Router>
  );
};
