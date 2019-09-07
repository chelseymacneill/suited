import React, { Component } from 'react';
import { Col, Row, Container } from "reactstrap";
import Footer from "../components/Footer";
import SignIn from "../components/SignIn";


class Login extends Component {
    
    render(){
        return(
            <Container fluid>
            <Row>
                <Col size="md-3" />
                <Col size="md-6">
                    <SignIn />
                </Col>
                <Col size="md-3" />
            </Row>
             <Footer />
            </Container>
        )
    }

};

export default Login;