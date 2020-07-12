import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import LayOut from './components/LayOut';
import Shows from './components/Shows';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

const App = (props) => (
  <Router>
    <LayOut {...props}>
      <Switch>
        <Route exact path="/" component={Shows} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </LayOut>
  </Router>
);

export default withRouter(App);
