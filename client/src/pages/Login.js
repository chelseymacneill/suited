import React, { Component } from 'react';
import { Col, Row, Container } from "reactstrap";
import Footer from "../components/Footer";
import SignIn from "../components/SignIn";


class Login extends Component {
    
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
                <Col size="md-12">
                    <Footer />
                </Col>
            </Row>
            </Container>
        )
    }

};

export default Login;