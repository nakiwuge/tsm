import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom';
import Login from './Components/Auth/Login';
import LayOut from './Components/LayOut';
import Shows from './Components/Shows';
import Signup from './Components/Auth/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import ShowDetails from './Components/Shows/ShowDetails';
import Watchlist from'./Components/WatchList';

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
        <Route exact path="/show/:id" component={ShowDetails} />
        <Route exact path="/watch-list" component={Watchlist} />
        <Route component={NotFound} />
      </Switch>
    </LayOut>
  </Router>
);

export default withRouter(App);
