import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ManageDDD from '../pages/ManageDDD';
import ManageTarifa from '../pages/ManageTarifa';
import ManagePlano from '../pages/ManagePlano';
import ViewTable from '../pages/ViewTable';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} SignIn />
    <Route path="/signup" exact component={SignUp} SignIn />
    <Route path="/ManageDDD" exact component={ManageDDD} SignIn />
    <Route path="/ManageTarifa" exact component={ManageTarifa} />
    <Route path="/ManagePlano" exact component={ManagePlano} />
    <Route path="/ViewTable" exact component={ViewTable} />
  </Switch>
);

export default Routes;
