import React from 'react';
import { Route } from 'react-router-dom';
import { authService } from '../Utils/authService';
import propTypes from 'prop-types';

const ProtectedRoute= ({ component: Component, ...props})=>{
  return (
    <React.Fragment>
      <Route
        {...props}
        render={  props =>{
          return authService.isAuthenticated()
            ?  <Component {...props} />  :authService.redirectUser();}
        }
      />
    </React.Fragment>
  );
};

ProtectedRoute.propTypes={
  component:{
    Component:propTypes.element.isRequired,
  },
};
   
export default ProtectedRoute;
