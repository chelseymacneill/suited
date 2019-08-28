import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

class App extends Component {

  render() {
    return (
        <Router>
          <div>
          <Nav />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
    )};
};

export default App;
