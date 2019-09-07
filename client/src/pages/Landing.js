import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button, Collapse, CardBody, Card, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import Footer from "../components/Footer";


class Landing extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1 className="p-2 text-center">
                                Find a career that is suited to you
                      {/* & <br /> learn what skills you need to be <br />a competitive applicant. */}
                            </h1>
                            <Button className="float-right" id="landingButton"><Link to="/search">Get Started =></Link></Button>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="12" id="landingBlurbCol">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                </Row>
                <Row>
                    <div className="mx-3">
                        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Instructions</Button>
                        <Collapse isOpen={this.state.collapse}>
                            <Card>
                                <CardBody>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search">Search Page</Link> - Search</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Type in a skill, job title, or position and a Location and click <em>Search</em> to search for Jobs in your area.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search">Search Page</Link> - Kanban Board</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Add skills to customize your search results. To save these preferences create an account! 
                                                (<Link to="/signup">Sign Up!</Link>)
                                                <br/>
                                                <br/>Green Column: These are skills that you want to prioritize in the search results
                                                <br/>Yellow Column: This is where your saved skills live, you can see which job postings they appear in but they don't affect the results returned
                                                <br/>Red Column: This allows you to see what skills are required for the position that don't align with your knowledge. You can choose to hide these results by clicking the checkbox
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search">Search Page</Link> - Results</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Click the <em>View</em> button on each job post to open a new tab to the acutal Job Posting.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search">Profile Page</Link> - Results</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Click the <em>View</em> button on each job post to open a new tab to the acutal Job Posting.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
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

export default Landing;