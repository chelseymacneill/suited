import React, { Component } from 'react';
// import axios from 'axios'
// import API from "../utils/API";
// import { Route, Link } from 'react-router-dom'
import { Col, Row, Container } from "../components/Grid";
import SignIn from "../components/SignIn";


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loggedIn: false,
          username: null
        }
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    //////////////////////////////////
    // state = {
    //     userToken: "",
    //     userID: "",
    //     email: "",
    //     password: "",
    // };

    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({
    //       [name]: value
    //     });

    //     console.log("test")
    //   };

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
        console.log("Login.js page state", this.props);
        this.getUser()
    }

    updateUser (userObject) {
        this.setState(userObject)
    }
    
    getUser() {
        console.log("login props test")
    // axios.get('/api/users/current').then(response => {
    //     console.log('Get user response: ', response.data)
    //     if (response.data.user) {
    //     console.log('Get User: There is a user saved in the server session: ')

    //     this.setState({
    //         loggedIn: true,
    //         username: response.data.user.username
    //     })
    //     } else {
    //     console.log('Get user: no user');
    //     this.setState({
    //         loggedIn: false,
    //         username: null
    //     })
    //     }
    // })
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