import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//, Redirect ^
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import passport from 'passport';

// import axios from 'axios'
import API from "./utils/API";


// {/* <Route exact path="/" render={() => (
//    passport.isAuthenticated()  ? (<Redirect to="/dashboard"/>) : (<PublicHomePage/>))}/> */}

class App extends Component {
    constructor() {
      super()
      this.state = {
        loggedIn: false,
        username: null
      }
      this.getUser = this.getUser.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
      this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount = (req, res) => {
    console.log("App.js state: ", req);
    this.getUser()
  }

  updateUser (userObject) {
      this.setState(userObject)
  }

  getUser() {
    console.log("app props test")

  // API.getCurrent()
  // .then(response => {
  //     console.log('Get user response: ', response.data)
  //       if (response.data.user) {
  //       console.log('Get User: There is a user saved in the server session: ')
  //         this.setState({
  //             loggedIn: true,
  //             username: response.data.user.username
  //         })
  //       } else {
  //       console.log('Get user: no user');
  //         this.setState({
  //             loggedIn: false,
  //             username: null
  //         })
  //       }
  //   })
  }

  render() {
    return (
        <Router>
          <div>
          <Nav />
            {/* <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn}/> */}
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
