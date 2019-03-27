import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup';
import Main from '../pages/Main';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
