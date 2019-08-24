import React, { Component } from "react";
import API from "../../utils/API";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { newUser } from "../../actions/testAction"
// import classnames from "classnames";

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
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

        // CALL ACTION HERE
        // API.postSignup(userSignup).then( response => {
        //     console.log(response.data);
        // })
        // this.props.newUser(userSignup, this.props.history)

        // console.log(this.props.auth.isAuthenticated);
        // this.props.history.push("/profile/1")
        // console.log("SIGN UP ", newUser.user);
        // console.log(user);
        this.props.newUser(userSignup, this.props.history);

        let userToken = localStorage.getItem("id_token");
        if (userToken) {
            this.setState({
                auth: true
            })
            console.log(this.props)

        } else {
            this.setState({
                auth: false
            })
            console.log(this.props)
        }
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

SignUp.propTypes = {
    newUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    posts: state.basic.user,
    auth: state.auth
});

export default connect(mapStateToProps, { newUser })(withRouter(SignUp));
// export default SignUp;