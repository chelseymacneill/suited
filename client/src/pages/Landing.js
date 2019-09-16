import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button, Collapse, CardBody, Card, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import Footer from "../components/Footer";
import sessions from "../utils/sessions";


let loggedIn;
let sessionKey;

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
        sessionKey = sessions.getSession();
        if (sessionKey) {
            loggedIn = true;
        } else {
            loggedIn = false;
        }
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1 className="p-2 text-center" id="landingH1">
                                Find a career that is perfectly suited to you
                      {/* & <br /> learn what skills you need to be <br />a competitive applicant. */}
                            </h1>
                            <Button className="float-right" id="landingButton"><Link to="/search">Get Started =></Link></Button>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row  className="text-center">
                    <Col md="1" className="pr-0">
                    <i className="fas fa-search landingIcon" />
                    </Col>
                    <Col md="11" className="pl-0 landingBlurbCol">
                    <p>Suited is a comprehensive job search, filter, and tracker. Our main focus is helping users find what jobs they’re suited for based on their skillset. Figuring out what positions align with your experience can be a major pain point for job seekers and this app helps to reduced some of that friction.</p>
                    </Col>
                </Row>
                <Row className="text-center">
                    
                    <Col md="10" className="pr-0 landingBlurbCol">
                    <p>Utelize this app research local companies! Many similar jobs have different titles or  the positions require a different set of skills despite identical names. This app cuts through the clutter of job-postings and allows users to find which positions they're truly quaified for.</p>
                    </Col>
                    <Col md="2"className="pl-0">
                    <i className="fab fa-amazon landingIcon" />&nbsp;&nbsp;&nbsp;&nbsp;<i class="fab fa-microsoft landingIcon"/>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fab fa-facebook-f landingIcon"/>&nbsp;
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col md="1" className="pr-0">
                    <i className="far fa-address-card landingIcon" />
                    </Col>
                    <Col md="11" className="pl-0 landingBlurbCol">
                    <p>Create an account and login to get all the features! You'll be able to save jobs to your profile, track your application progress and even add notes to each job. Simply sign up, and open your profile for the full experience! See the instructions below if you're not sure how to get started. </p>
                    </Col>
                </Row>
                <Row>
                    <div className="mx-3">
                        <Button color="secondary" id="helpButton" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Instructions</Button>
                        <Collapse isOpen={this.state.collapse}>
                            <Card className="helpCard">
                                <CardBody className="helpCard">
                                    <ListGroup className="helpCard">
                                        <ListGroupItem className="helpCard">
                                            <ListGroupItemHeading><Link to="/search" className="helpLink">Search Page</Link> - Search</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Type in a skill, job title, or position and a Location and click <em>Search</em> to search for Jobs in your area.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search" className="helpLink">Search Page</Link> - Kanban Board</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Add skills to customize your search results. To save these preferences create an account! 
                                                (<Link to="/signup" className="helpLink">Sign Up!</Link>)
                                                <br/>
                                                <br/>Green Column: These are skills that you want to prioritize in the search results
                                                <br/>Yellow Column: This is where your saved skills live, you can see which job postings they appear in but they don't affect the results returned
                                                <br/>Red Column: This allows you to see what skills are required for the position that don't align with your knowledge. You can choose to hide these results by clicking the checkbox
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search" className="helpLink">Search Page</Link> - Results</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Click the <em>View</em> button on each job post to open a new tab to the acutal Job Posting.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to={"/profile/" + sessionKey } className="helpLink">Profile Page</Link> - Favorites</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                See all the jobs you've favorited including details and a link to the post
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to={"/profile/" + sessionKey } className="helpLink">Profile Page</Link> - Job Tracker</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                Use this drag and drop Kanban board to track your job progress! You can move each job tile to different columns depending on where in the application process you are. If you cick on a job, you'll be able to set your level of interest in the job, and even create or delete notes about your progress
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading><Link to="/search" className="helpLink">Profile Page</Link> - Set Skills</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                This is an area to set your initial skills to your profile. After setting your skills, they will populate in your job-search filter automatically to help you in your search.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </Row>
                <Footer />
            </Container>
        )
    }

};

export default Landing;