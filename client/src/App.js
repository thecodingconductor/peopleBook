import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About';
import OrganizationState from './context/organization/OrganizationState';
import ContactState from './context/contact/ContactState';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <ContactState>
      <OrganizationState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/about" component={About}></Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </OrganizationState>
    </ContactState>

  );
}

export default App;
