import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from 'react-router-dom'
import sessions from "../../utils/sessions"

let loggedIn;
let sessionKey;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirectTo: null,
            loggedIn: false,
            username: null
    
        }
        this.onChange = this.onChange.bind(this);    
        this.onSubmit = this.onSubmit.bind(this);    

    }

    onChange(event) {
        this.setState( { [event.target.name]: event.target.value } );
    }

    onSubmit(event) {
        event.preventDefault();

        // API.userEmail(this.state.email)
        // .then(response => {
        //     console.log('user email response: ', response)
        //     if (response.status === 200) {
        //         console.log("user email is already in use")
        //     } else {
                ///////////////IF USER EMAIL DOES NOT EXIST, CREATE NEW USER /////////////
                const userLogin = {
                    user: {
                        email: this.state.email,
                        password: this.state.password
                    }
                }

                API.postLogin(userLogin)
                .then( response => {
                    sessions.setSession(response.data.user._id);
                    console.log('login response: ', response)
                    if (response.status === 200) {
                        this.setState({
                            loggedIn: true,
                            username: response.data.user._id,
                            redirectTo: '/profile/' + response.data.user._id
                        })
                    } else {
                        alert('login error')
                    }
                }).catch(error => {
                    alert('login error: Please check username or Password', error)
                });
            // }
        //   }).catch(error => {
        //     alert('create favorite error: ', error)
        //   });

        
    };

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

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else if (loggedIn === true) {
            this.logout();
            return <Redirect to={{ pathname: "/login" }} />
        } else {
        return (
            <div className="card mt-5 authCard">
                <div className="card-header"><h2>Log In</h2></div>
                <img className="card-img-top" src="https://usabilitylab.walkme.com/wp-content/uploads/2014/12/231-740x360.jpg" alt="Card cap" />
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input name="email" value={this.state.email} onChange={this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" value={this.state.password} onChange={this.onChange}type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary authSubmit float-right">Sign In</button>
                    <br /><a className="authLink" href="/signup">Or click here to Sign Up</a>
                    </form>
                </div>
            </div>
        )};
    };
};

export default SignIn;