import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from 'react-router-dom'
import sessions from "../../utils/sessions"
//, Route, Link ^
// import axios from 'axios'

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
            } 
        }).catch(error => {
            alert('login error: ', error)
        });
    };


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
        return (
            <div className="card mt-5">
                <div className="card-header"><h2>Sign In</h2></div>
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
                    <button type="submit" className="btn btn-primary">Sign In</button>
                    <br /><br /><a href="/signup">Or click here to Sign Up</a>
                    </form>
                </div>
            </div>
        )};
    };
};

export default SignIn;