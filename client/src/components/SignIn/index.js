import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions"


class SignIn extends Component {
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
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/profile/1"); // push user to dashboard when they login
        }
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

        const userLogin = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }

        // API.postLogin(userSignin).then( response => {
        //     console.log(response.data);
        // })
        this.props.loginUser(userLogin);

        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }

    render() {
        const { errors } = this.state;
    return (
        <div className="card mt-5">
            <div className="card-header"><h2>Sign In</h2></div>
            <img className="card-img-top" src="https://usabilitylab.walkme.com/wp-content/uploads/2014/12/231-740x360.jpg" alt="Card image cap" />
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.onChange}
                        // error={errors.email} 
                        type="email" 
                        className="form-control" 
                        // className={classnames("", {
                        //     invalid: errors.email || errors.emailnotfound
                        //   })}
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" />
                    {/* <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                    </span>                 */}
                    </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.onChange}
                        // error={errors.password}
                        type="password" 
                        className="form-control" 
                        // className={classnames("", {
                        //     invalid: errors.password || errors.passwordincorrect
                        //   })}
                        id="exampleInputPassword1" 
                        placeholder="Password" />
                {/* <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span> */}
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
                <br /><br /><a href="/signup">Or click here to Sign Up</a>
                </form>
            </div>
        </div>
    )};
};

SignIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    posts: state.basic.user,
    auth: state.auth,
    errors: state.errors
});
//This allows us to call this.props.auth or this.props.errors within this component

export default connect(mapStateToProps, { loginUser })(SignIn);
// export default connect(mapStateToProps, { loginUser })(SignIn);

// export default SignIn;
