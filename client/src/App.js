import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom';
import Login from './Components/Auth/Login';
import LayOut from './Components/LayOut';
import Shows from './Components/Shows';
import Signup from './Components/Auth/Signup';
import ProtectedRoute from './Components/ProtectedRoute';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

const App = (props) => (
  <Router>
    <LayOut {...props}>
      <Switch>
        <ProtectedRoute exact path="/" component={Shows} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </LayOut>
  </Router>
);

export default withRouter(App);
