import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import SignUp from "../components/SignUp";
import Footer from "../components/Footer";


class Signup extends Component {
    
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
                <Col size="12">
                    <Footer />
                </Col>
            </Row>
            </Container>
        )
    }

};

export default Signup;