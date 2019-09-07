import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import SignUp from "../components/SignUp";
import Footer from "../components/Footer";


class Signup extends Component {
    
    render(){
        return(
            <Container fluid>
            <Row>
                <Col size="md-3" />
                <Col size="md-6">
                    <SignUp />
                </Col>
                <Col size="md-3" />
            </Row>
            <Footer />
            </Container>
        )
    }

};

export default Signup;