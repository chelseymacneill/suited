import React, { Component } from "react";
// import { Redirect } from 'react-router-dom'

import { Route, Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import axios from "axios";
import "./style.css";
import sessions from "../../utils/sessions"

let loggedIn = false;
let sessionKey;

class Nav extends Component {

  logout() {
    // event.preventDefault()
    console.log('logging out')
    sessions.clearSession();
    // history.push("/")
    loggedIn = false;
    // return <Redirect to="/" />

  }

  render() {
    console.log("get session key", sessions.getSession());
    sessionKey = sessions.getSession();
    if (sessionKey) {
      loggedIn = true;
    } else {
    console.log("false", sessionKey)
    }
    // return sessionKey;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Job Search</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
          {loggedIn ? (
          <section>
            <div className="navbar-nav">
            <a className="nav-item nav-link" href="/search">Search<span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href={"/profile/" + sessionKey } >Profile</a>
            <Link to="/" onClick={() => this.logout() } className="nav-item btn btn-outline-success">Logout</Link>
            </div>
            </section>
          ) : (
            <section>
            <div className="navbar-nav">
            <a className="nav-item nav-link" href="/search">Search<span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link disabled" href="#" disabled>Profile</a>
            <a className="nav-item btn btn-outline-success" href="/login">Login</a>
            </div>
            </section>
          )}
        </div>
      </nav>
    );
  }
}

export default Nav;

      // <div>
      //   <header className="navbar App-header" id="nav-container">
      //     <div className="col-4" >
      //       {loggedIn ? (
      //         <section className="navbar-section">
      //           <Link to="#" className="btn btn-link text-primary" onClick={this.logout}>
      //             <span className="text-primary">logout</span></Link>

      //         </section>
      //       ) : (
      //           <section className="navbar-section">
      //             <Link to="/" className="btn btn-link text-primary">
      //               <span className="text-primary">home</span>
      //             </Link>
      //             <Link to="/login" className="btn btn-link text-primary">
      //               <span className="text-primary">login</span>
      //             </Link>
      //             <Link to="/signup" className="btn btn-link">
      //               <span className="text-primary">sign up</span>
      //             </Link>
      //           </section>
      //         )}
      //     </div>
      //     <div className="col-4 col-mr-auto">
      //       <div id="top-filler"></div>
      //       <h1 className="App-title">MERN Passport</h1>
      //     </div>
      //   </header>
      // </div>
