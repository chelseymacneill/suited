import React, { Component } from 'react';
// import axios from 'axios'
// import API from "../utils/API";
// import { Route, Link } from 'react-router-dom'
import { Col, Row, Container } from "../components/Grid";
import SignIn from "../components/SignIn";


class Login extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          username: null
        }
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }



    componentDidMount = () => {
        console.log("Login.js page state", this.props);
        this.getUser()
    }

    updateUser (userObject) {
        this.setState(userObject)
    }
    
    getUser() {
        console.log("login props test")

    }
    
    render(){
        return(
            <Container fluid>
            <Row>
                <Col size="md-4" />
                <Col size="md-4">
                    {/* <SignIn updateUser={this.updateUser} loggedIn={this.state.loggedIn}/> */}
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