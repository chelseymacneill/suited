import React, { Component } from "react";
// import { Route, Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from "axios";
import "./style.css";

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      width: window.innerWidth
    };

    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  //PAGE'S COMMENTED OUT NAV BAR STUFF
  // <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //     <a className="navbar-brand" href="/">Job Search</a>
  //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
  //       <div className="navbar-nav">
  //         <a className="nav-item nav-link active" href="/search">Search <span className="sr-only">(current)</span></a>
  //         <a className="nav-item nav-link disabled" href="/profile/1">Profile</a>
  //         <a className="nav-item nav-link" href="/login">Login</a>
  //       </div>
  //     </div>
  //   </nav>

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ', this.props)

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4" >
            {loggedIn ? (
              <section className="navbar-section">
                <Link to="#" className="btn btn-link text-primary" onClick={this.logout}>
                  <span className="text-primary">logout</span></Link>

              </section>
            ) : (
                <section className="navbar-section">
                  <Link to="/" className="btn btn-link text-primary">
                    <span className="text-primary">home</span>
                  </Link>
                  <Link to="/login" className="btn btn-link text-primary">
                    <span className="text-primary">login</span>
                  </Link>
                  <Link to="/signup" className="btn btn-link">
                    <span className="text-primary">sign up</span>
                  </Link>
                </section>
              )}
          </div>
          <div className="col-4 col-mr-auto">
            <div id="top-filler"></div>
            <h1 className="App-title">MERN Passport</h1>
          </div>
        </header>
      </div>
      //    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <a className="navbar-brand" href="/">Job Search</a>
      //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>
      //   <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
      //     <div className="navbar-nav">
      //       <a className="nav-item nav-link active" href="/search">Search <span className="sr-only">(current)</span></a>
      //       <a className="nav-item nav-link disabled" href="/profile/1">Profile</a>
      //       <a className="nav-item nav-link" href="/login">Login</a>
      //     </div>
      //   </div>
      // </nav>



      /////////////////////////////////////////////////
      // <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
      //   <Link className="navbar-brand" to="/">
      //     Google Books
      //   </Link>
      //   <button
      //     onClick={this.toggleNav}
      //     className="navbar-toggler"
      //     data-toggle="collapse"
      //     data-target="#navbarNav"
      //     aria-controls="navbarNav"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon" />
      //   </button>
      //   <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
      //     <ul className="navbar-nav">
      //       <li className="nav-item">
      //         <Link
      //           onClick={this.toggleNav}
      //           className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
      //           to="/"
      //         >
      //           Search
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link
      //           onClick={this.toggleNav}
      //           className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
      //           to="/saved"
      //         >
      //           Saved
      //         </Link>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    );
  }
}

export default Nav;
