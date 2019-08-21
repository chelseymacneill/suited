import React, { Component } from "react";
import API from "../../utils/API";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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

        API.postSignup(userSignup).then( response => {
            console.log(response.data);
        })
    }

    render() {
    return (
        <div className="card mt-5">
                <div className="card-header"><h2>Sign Up</h2></div>
                <img className="card-img-top" src="https://usabilitylab.walkme.com/wp-content/uploads/2014/12/231-740x360.jpg" alt="Card image cap" />
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
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        <br /><br /><a href="/login">Or click here to Log In</a>
                        </form>
                    </div>
                </div>

    )};
};


export default SignUp;
