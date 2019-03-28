import React from 'react';
import {
  Switch,
} from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import history from './history';

import Private from './private';
import Guest from './guest';

import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup';
import Main from '../pages/Main';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest path="/signin" component={Signin} />
      <Guest path="/signup" component={Signup} />
      <Private path="/" exact component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
