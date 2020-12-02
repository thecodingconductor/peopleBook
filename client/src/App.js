import React, { Fragment } from 'react';
// import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import People from './components/pages/People';
import Dashboard from './components/pages/Dashboard';
import OrganizationsPage from './components/pages/OrganizationsPage';
import OrganizationState from './context/organization/OrganizationState';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import NavState from './context/nav/NavState';
import setAuthToken from '../src/utils/setAuthToken';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <NavState>
        <ContactState>
          <AlertState>
            <OrganizationState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className="container-fluid container-main">
                    <Switch>
                      <PrivateRoute exact path="/" component={Home} />
                      <PrivateRoute exact path='/people' component={People} />
                      <PrivateRoute exact path="/organizations" component={OrganizationsPage} />
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </OrganizationState>
          </AlertState>
        </ContactState>
      </NavState>
    </AuthState>
  );
}

export default App;
