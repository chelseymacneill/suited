import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import passport from 'passport';
// import passRouter from ""


//REDUX STUFF
// import { createStore, applyMiddleware } from "redux";

import { Provider } from "react-redux";
import store from "./store";
//we'll have jsonStore, authStore, userStore, etc.

// const store = createStore( () => [], {}, applyMiddleware() );
// function test(req, res) {
//   console.log()
// }
            // {/* <Route exact path="/" render={() => (
            //    passport.isAuthenticated()  ? (<Redirect to="/dashboard"/>) : (<PublicHomePage/>))}/> */}


function App() {
  return (
    // store holds the state
    //DISPATCH AN ACTION TO CHANGE THE STATE
    <Provider store={store}>
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
    </Provider>
  );
}

//BASE FILE STRUCTURE
// function App() {
//   return (
//     <Router>
//       <div>
//         <Nav />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/saved" component={Saved} />
//           <Route component={NoMatch} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

export default App;
