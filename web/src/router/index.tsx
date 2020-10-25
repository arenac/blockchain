import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import ConductTransaction from '../pages/ConductTransaction';
import Blockchain from '../pages/Blockchain';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/transactions" component={ConductTransaction} />
    <Route path="/blockchain" component={Blockchain}/>
  </Switch>
)

export default Router;
