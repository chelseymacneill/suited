import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import SignUp from "../components/SignUp";

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
                <Col size="md-10 md-offset-1">
                    {/* insert footer component */}
                    <h2>Footer Down at the bottom</h2>
                </Col>
            </Row>
            </Container>
        )
    }

};

export default Signup;