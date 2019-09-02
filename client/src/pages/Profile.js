import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Redirect } from 'react-router-dom'
import sessions from "../utils/sessions"

import Card from "../components/Card";
import Job from "../components/Job";
import { List } from "../components/List";

import API from "../utils/API";
// import { TabHeader, TabItem, TabBody, TabPane } from "../components/Tabs";

// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
// import Sonnet from 'react-bootstrap/Sonnet';



let loggedIn;
let sessionKey;

function removeFavorite(job) {
    const id = job.job.jobID;
    let result = window.confirm("Are you sure you wish to delete this item?");
    if (result) {
        console.log("user wants to delete: ", id)
        API.removeFavorite({ "jobID": id })
            .then(response => {
                console.log('remove favorite Job response: ', response)
                if (response.status === 200) {
                    console.log("job removed from favorites")
                    window.location.reload();
                }
            }).catch(error => {
                console.log('remove favorite error: ', error)
            });
    }
}

class Profile extends Component {
    state = {
        jobs: [],
        message: "No Jobs saved yet, please use the search page",
    }
    componentDidMount() {
        //GET USER DATA HERE
        // console.log(JSON.stringify(req.headers));
        console.log("success!", sessionKey, window.location.href)

        API.getFavorites({ "userID": sessionKey })
            // API.getFavorites(sessionKey)
            .then(response => {
                console.log('favorite Job response: ', response)
                if (response.status === 200) {
                    //   alert("job added to favorites!")
                    this.setState({
                        jobs: response.data
                    })
                }

            }).catch(error => {
                alert('create favorite error: ', error)
            });
    };

    render() {
        sessionKey = sessions.getSession();
        if (sessionKey) {
            loggedIn = true;
        } else {
            loggedIn = false;
        }

        if (loggedIn === false) {
            return <Redirect to={{ pathname: "/login" }} />
        } else {
            return (
                <Container fluid>
                    <Row>
                        <Col size="md-12">
                            <Jumbotron>
                                <h1>
                                    Hello World: {sessionKey}
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
                            {/* <h2>Job Cards live here - from Swing Table DB Collection</h2> */}
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist" >
                                    <a className="nav-item nav-link active" id="nav-favorites-tab" data-toggle="tab" href="#nav-favorites" role="tab" aria-controls="nav-favorites" aria-selected="true">Saved Jobs</a>
                                    <a className="nav-item nav-link" id="nav-skills-tab" data-toggle="tab" href="#nav-skills" role="tab" aria-controls="nav-skills" aria-selected="false">Skills</a>
                                    <a className="nav-item nav-link" id="nav-tracker-tab" data-toggle="tab" href="#nav-tracker" role="tab" aria-controls="nav-tracker" aria-selected="false">Job Tracker</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-favorites" role="tabpanel" aria-labelledby="nav-favorites-tab">
                                    <Card title="Saved Jobs">
                                        {this.state.jobs.length ? (
                                            <List>
                                                {this.state.jobs.map( (job, i) => (
                                                    <Job
                                                        key={i}
                                                        jobID={job.id}
                                                        title={job.title}
                                                        company={job.company}
                                                        location={job.location}
                                                        date={job.date}
                                                        summary={job.summary}
                                                        url={job.url}
                                                        onClick={() => removeFavorite({ job })}
                                                        profile="true"
                                                    />
                                                ))}
                                            </List>
                                        ) : (
                                                <h2 className="text-center">{this.state.message}</h2>
                                            )}
                                    </Card>
                                </div>
                                <div className="tab-pane fade" id="nav-skills" role="tabpanel" aria-labelledby="nav-skills-tab">
                                    <Card title="Saved Skills"></Card>
                                </div>
                                <div className="tab-pane fade" id="nav-tracker" role="tabpanel" aria-labelledby="nav-tracker-tab">...</div>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-10 md-offset-1">
                            {/* insert footer component */}
                            <h2>Footer Down at the bottom</h2>
                            {/* <div class="row"> */}
                        </Col>
                    </Row>

                </Container>
            )
        }
    }
};

export default Profile;

