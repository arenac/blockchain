import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConductTransaction from '../components/ConductTransaction';

import Home from '../pages/Home';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/transactions" component={ConductTransaction} />
  </Switch>
)

export default Router;
