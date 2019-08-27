import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from 'react-router-dom'
//, Route, Link ^
// import axios from 'axios'

class SignIn extends Component {
    constructor(props) {
        super(props);
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

        const userLogin = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }

        API.postLogin(userLogin).then( response => {
            console.log(response.data);
        })
        // API.postLogin(userLogin)
        // .then( response => {
        //     console.log('login response: ', response)
        //     if (response.status === 200) {
        //         // update App.js state
        //         this.props.updateUser({
        //             loggedIn: true,
        //             username: response.data.username
        //         })
        //         // update the state to redirect to home
        //         this.setState({
        //             redirectTo: '/search'
        //         })
        //     }
        // }).catch(error => {
        //     console.log('login error: ')
        //     console.log(error);
        // })
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
                        <label for="exampleInputEmail1">Email address</label>
                        <input name="email" value={this.state.email} onChange={this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
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