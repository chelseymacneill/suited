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

import Board from 'react-trello'

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

function handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
    console.log("card dropped", cardDetails, cardId)
    let data = {
        id: cardId,
        status: targetLaneId
    }
    API.updateFavorite(data).then(response => {
        console.log('update job status response: ', response)
        if (response.status === 200) {
            console.log("job status updated")
        }
    }).catch(error => {
        console.log('remove favorite error: ', error)
    });
}

function onCardClick(cardId, metadata, laneId) {
    let data = metadata;
    console.log(data, laneId);
}


class Profile extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            jobs: [],
            lane1: [],
            lane2: [],
            lane3: [],
            lane4: [],
            lane5: [],
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
        let lane1 = [];
        let lane2 = [];
        let lane3 = [];
        let lane4 = [];
        let lane5 = [];
        //GET USER DATA HERE
        // console.log(JSON.stringify(req.headers));
        console.log("success!", sessionKey, window.location.href)

        API.getFavorites({ "userID": sessionKey })
            // API.getFavorites(sessionKey)
            .then(response => {
                console.log('favorite Job response: ', response)
                if (response.status === 200) {
                    //   alert("job added to favorites!")

                    for (let i = 0; i < response.data.length;  i++) {
                        let job = response.data[i];
                        let eachJob =  {           
                                id: job._id,
                                title: job.company,
                                description: job.title,
                                label: job.location,
                                // draggable: true,
                                laneDraggable: false,
                                metadata: {
                                    status: job.status,
                                    index: i,
                                    url: job.url,
                                    interest: job.interest,
                                    jobID: job.jobID
                                }
                            };
                        console.log(eachJob.metadata)
                        switch (eachJob.metadata.status)  {
                            case "lane1":
                                lane1.push(eachJob);
                                break;
                            case "lane2":
                                    lane2.push(eachJob);
                                break;
                            case "lane3":
                                    lane3.push(eachJob);
                                break;
                            case "lane4":
                                    lane4.push(eachJob);
                                break;
                            case "lane5":
                                    lane5.push(eachJob);
                                break;
                            default:
                                lane1.push(eachJob);
                        }   

                    }
                    // console.log(lane1);
                    this.setState({
                        jobs: response.data,
                        lane1: lane1,
                        lane2: lane2,
                        lane3: lane3,
                        lane4: lane4,
                        lane5: lane5,
                    })
                }



            }).catch(error => {
                alert('create favorite error: ', error)
            });
    };

    render() {
        const data = {
            lanes: [
              {
                id: 'lane1',
                title: 'Unassigned',
                label: '2/2',
                cards: this.state.lane1
              },
              {
                id: 'lane2',
                title: 'Application Sent',
                label: '0/0',
                cards: this.state.lane2
                //     [
                //     {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
                //     {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
                //   ]
              },
              {
                id: 'lane3',
                title: 'Response Received',
                label: '0/0',
                cards: this.state.lane3
              },
              {
                id: 'lane4',
                title: 'Had Phone Interview',
                label: '0/0',
                cards: this.state.lane4
              },
              {
                id: 'lane5',
                title: 'Had Live Interview',
                label: '0/0',
                cards: this.state.lane5
              }
            ]
          }

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
                                    Hello World:
                                </h1>
                                <p>{sessionKey}</p>
                                {/* insert recommended job container and job card components */}
                                <h2>Recommended Jobs (Job Cards) live here - from Swing Table DB Collection</h2>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        
                        {/* <Col size="md-4">
                            {/* insert user card component */}
                        {/* <h2>User Profile Details</h2> */}
                        {/* </Col> */}
                        <Col md="12">
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
                                    {/**************** SAVED JOBS **************/}
                                    <TabPane tabId="1">
                                        <Row>
                                        <Col md="3">
                                            <h2>Profile</h2>
                                        </Col>
                                        <Col sm="9">
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
                                    {/**************** JOB TRACKER BOARD **************/}
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col lg="12">
                                                <Board data={data} onCardClick={onCardClick} handleDragEnd={handleDragEnd} />
                                            </Col>
                                        </Row>
                                        {/* <Row>
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
                                                                    onClick={() => console.log("clicked")}
                                                                    profile="true"
                                                                />
                                                            ))}
                                                        </section>
                                                    ) : (
                                                            <h2 className="text-center">{this.state.message}</h2>
                                                        )}
                                                </CardColumns>
                                            </Col>
                                        </Row> */}
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
