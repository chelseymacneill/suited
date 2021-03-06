import React, { Component } from "react";
import { Link } from 'react-router-dom'
// import axios from "axios";
import "./style.css";
import sessions from "../../utils/sessions"

let loggedIn;
let sessionKey;

class Nav extends Component {

  logout() {
    sessions.clearSession();
    loggedIn = false;
  }

  render() {
    
    sessionKey = sessions.getSession();
    if (sessionKey) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/"><img id="navLogo" src={process.env.PUBLIC_URL + '/suitedLogo1.png'}/>&nbsp;&nbsp;Suited</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
          {loggedIn ? (
          <section>
            <div className="navbar-nav">
            <a className="nav-item nav-link" href="/search">Search<span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href={"/profile/" + sessionKey } >Profile</a>
            <Link to="/" onClick={() => this.logout() } className="authBtn nav-item btn">Logout</Link>
            </div>
            </section>
          ) : (
            <section>
            <div className="navbar-nav">
            <a className="nav-item nav-link" href="/search">Search<span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link disabled" disabled>Profile</a>
            <Link to="/login" className="nav-item btn authBtn">Login</Link>
            </div>
            </section>
          )}
        </div>
      </nav>
    );
  }
}

export default Nav;