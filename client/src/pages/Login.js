import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


class Login extends Component {
    state = {
        userToken: "",
        userID: "",
        email: "",
        password: "",
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });

        console.log("test")
      };

    //   componentWillMount = () => {
    //     API.postSignup({
    //         "user": {
    //           "email": "test3@test3.com",
    //           "password": "test3"
    //         }
    //       })
    //       .then( response => {
    //         // console.log(response.data);
    //         const user = response.data;
    //         // console.log(user.email)
    //         // this.setState({
    //         //     userEmail: user.email,
    //         //      userToken: user.token,
    //         //      userID: user._id
    //         // })
    //         this.setState({userToken: user.token, userId: user._id});
    //       });
    //   };

    componentDidMount = () => {
        console.log(this.state);
    }

    //   handleSubmit = async event => {
    //     event.preventDefault();
      
    //     try {
    //       await Auth.signIn(this.state.email, this.state.password);
    //       this.props.userHasAuthenticated(true);
    //       this.props.history.push("/");
    //     } catch (e) {
    //       alert(e.message);
    //     }
    //   }

      

    // handleFormSubmit = event => {
    //     event.preventDefault();
    //     this.();
    // };

//    onChange = () => {
       
//    }

    
    render(){
        // const userInfo = 
            // <div>
            //     <h3>{this.state.user}</h3>
            // </div>

        return(
            <Container fluid>
            <Row>
                <Col size="md-4" />
                <Col size="md-4">
                    <SignIn />
                    {/* <div className="card">
                <img className="card-img-top" src="https://usabilitylab.walkme.com/wp-content/uploads/2014/12/231-740x360.jpg" alt="Card image cap" />
                    <div className="card-body"> */}
                    {/* <div>
                        <h3>{this.state.user}</h3>
                    </div> */}
                    {/* <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input value={this.state.email} onChange={this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input value={this.state.body} onChange={this.onChange}type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div> */}
                </Col>
                <Col size="md-4" />
            </Row>
            <Row>
                <Col size="md-10 md-offset-1">
                    {/* insert footer component */}
                    <h2>Footer Down at the bottom</h2>
                </Col>
            </Row>
            </Container>
        )
    }

};

export default Login;