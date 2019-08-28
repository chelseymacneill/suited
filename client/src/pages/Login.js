import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import SignIn from "../components/SignIn";


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
    
    render(){
        return(
            <Container fluid>
            <Row>
                <Col size="md-4" />
                <Col size="md-4">
                    <SignIn />
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