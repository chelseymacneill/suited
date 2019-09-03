import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Row, Col } from "../components/Grid";
// import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Redirect } from 'react-router-dom'
import sessions from "../utils/sessions"

import BP_Card from "../components/BP_Card";
import Job from "../components/Job";
import SmJob from "../components/SmJob";
import { List } from "../components/List";

import API from "../utils/API";

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardGroup, CardColumns, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';

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
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            jobs: [],
            message: "No Jobs saved yet, please use the search page"
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
                        <Col md="3">
                        <h2>Profile</h2>

                        </Col>
                        {/* <Col size="md-4">
                            {/* insert user card component */}
                            {/* <h2>User Profile Details</h2> */}
                        {/* </Col> */} 
                        <Col md="9">
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}>
                                            Saved Jobs
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}>
                                            Job Tracker
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}>
                                            Quiz
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <BP_Card title="Saved Jobs">
                                                    {this.state.jobs.length ? (
                                                        <List>
                                                            {this.state.jobs.map((job, i) => (
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
                                                </BP_Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                    <Row>
                                            <Col sm="12">
                                            <CardColumns>
                                                {this.state.jobs.length ? (
                                                    <section>
                                                    {this.state.jobs.map((job, i) => (
                                                        <SmJob
                                                            key={i}
                                                            jobID={job.id}
                                                            title={job.title}
                                                            company={job.company}
                                                            location={job.location}
                                                            date={job.date}
                                                            summary={job.summary}
                                                            url={job.url}
                                                            onClick={ () => console.log("clicked")}
                                                            profile="true"
                                                        />
                                                    ))}
                                                    </section>
                                                    ) : (
                                                        <h2 className="text-center">{this.state.message}</h2>
                                                    )}
                                                </CardColumns>
                                                <Row>
                                                
                                                </Row>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            <Col sm="12">
                                                {/* <Quiz></Quiz> */}
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
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

// render() {
//     return (
//     );
//   }

//     {/* <Card body>
//         <CardTitle>Special Title Treatment</CardTitle>
//         <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
//         <Button>Go somewhere</Button>
//     </Card> */}
//     <Row>
//         <Col sm="2">
//             <Card body>
//             <CardTitle>Plan to Apply</CardTitle>
//             </Card>
//         </Col>
//         <Col sm="2">
//             <Card body>
//             <CardTitle>Sent Application</CardTitle>
//             </Card>
//         </Col>
//         <Col sm="2">
//             <Card body>
//             <CardTitle>Response Recieved</CardTitle>
//             </Card>
//         </Col>
//         <Col sm="2">
//             <Card body>
//             <CardTitle>Phone Interview</CardTitle>
//             </Card>
//         </Col>
//         <Col sm="2">
//         <Card body>
//             <CardTitle>Live Interview</CardTitle>
//             </Card>
//         </Col>
//         <Col sm="2">
//         <Card body>
//             <CardTitle>Received Offer</CardTitle>
//             </Card>
//         </Col>
//     </Row>
//     <Row>
//         <Col sm="2"></Col>
//         <Col sm="2"></Col>
//         <Col sm="2"></Col>
//         <Col sm="2"></Col>
//         <Col sm="2"></Col>
//         <Col sm="2"></Col>
//         <Col sm="2"></Col>
//     </Row>
