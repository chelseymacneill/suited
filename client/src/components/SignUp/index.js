import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from 'react-router-dom'
import sessions from "../../utils/sessions"

let loggedIn;
let sessionKey;

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirectTo: null
        }
        this.onChange = this.onChange.bind(this);    
        this.onSubmit = this.onSubmit.bind(this);    

    }

    onChange(event) {
        this.setState( { [event.target.name]: event.target.value } );
    }

    onSubmit(event) {
        event.preventDefault();

        const userSignup = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }

        API.postSignup(userSignup)
        .then(response => {
            console.log("user signup response", response)
            if (!response.data.errmsg) {
                console.log('successful signup', response.user)
                this.setState({ //redirect to login page
                    redirectTo: '/login'
                })
                alert("Signup Successful! Redirecting to the Sign In Page")
            } else {
                console.log('username already taken')
            }
        }).catch(error => {
            console.log('signup error: ')
            console.log(error)

        })
    }

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
            return <Redirect to={{ pathname: "/signup" }} />
        } else {
        return (
            <div className="card mt-5">
                <div className="card-header"><h2>Sign Up</h2></div>
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
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <br /><br /><a href="/login">Or click here to Log In</a>
                    </form>
                </div>
            </div>
        )}
    };
};

export default SignUp;