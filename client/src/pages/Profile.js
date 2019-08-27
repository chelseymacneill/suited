import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";

class Profile extends Component {
    state = {
        userID: this.props.match.params.id
    };

    // componentDidMount() {
        //API call to get user data
    //   };

    render(){
        const { user } = this.props.auth;
        console.log(user);

        return(
            <Container fluid>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>
                      Hello World: {this.state.userID}
                  </h1>
                    {/* insert recommended job container and job card components */}
                    <h2>Recommended Jobs (Job Cards) live here - from Swing Table DB Collection</h2>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
                <Col size="md-10 md-offset-1">
                </Col>
            </Row>
            <Row>
                <Col size="md-4">
                    {/* insert user card component */}
                    <h2>User Profile Details</h2>
                </Col>
                <Col size="md-8">
                    {/* insert job container and job card components */}
                    <h2>Job Cards live here - from Swing Table DB Collection</h2>
                </Col>
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

export default Profile;

