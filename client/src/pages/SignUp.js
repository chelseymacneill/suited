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

    render(){
        return(
            <Container fluid>
            <Row>
                <Col size="md-4" />
                <Col size="md-4">
                    <SignUp />
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