import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

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
    return (
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Job Search</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/search">Search <span className="sr-only">(current)</span></a>
          <a className="nav-item nav-link disabled" href="/profile/1">Profile</a>
          <a className="nav-item nav-link" href="/login">Login</a>
        </div>
      </div>
    </nav>
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
