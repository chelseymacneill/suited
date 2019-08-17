import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
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
