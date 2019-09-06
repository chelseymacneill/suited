import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Row, Col } from "../components/Grid";
// import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Redirect } from 'react-router-dom';
import sessions from "../utils/sessions";
// import Quiz from "../components/Quiz";

// import BP_Card from "../components/BP_Card";
import Job from "../components/Job";
// import SmJob from "../components/SmJob";
import { List } from "../components/List";

import API from "../utils/API";

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardHeader, CardGroup, CardColumns, CardText, Row, Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
// import PropTypes from "prop-types"

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


class Profile extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onCardClick = this.onCardClick.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            activeTab: '2',
            modal: false,
            jobs: [],
            lane1: [],
            lane2: [],
            lane3: [],
            lane4: [],
            lane5: [],
            message: "No Jobs saved yet, please use the search page",
            editJob: {},
            text: "",
            select: ""
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.toggleModal();
        console.log(this.state.text, this.state.select)
        console.log(this.state.editJob._id)

        let data = {
            id: this.state.editJob._id,
            interest: this.state.select
        }
        API.updateFavorite(data)
        .then(response => {
            console.log('update user job status response: ', response)
            if (response.status === 200) {
                console.log("job interest level updated")
            }
        }).catch(error => {
            console.log('remove favorite error: ', error)
        });

        let note = {
            id: this.state.editJob._id,
            text: this.state.text
        }

        // API.createNote(note)
        // .then(response => {
        //     console.log('update note status response: ', response)
        //     if (response.status === 200) {
        //         console.log("note updated")
        //     }
        // }).catch(error => {
        //     console.log('create note error: ', error)
        // });
    };

//     // Route for adding a note to an article
// app.post("/articles/:id", function (req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             // If a Note was created successfully, find one Article with an _id equal to req.params.id. Update the Article to be associated with the new Note
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another .then which receives the result of the query
//             //$push adds note to the list of notes
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
//         })
//         .then(function (dbArticle) {
//             // If we were able to successfully update an Article, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
//  });

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
        console.log("card dropped", cardDetails, cardId)
        let data = {
            id: cardId,
            status: targetLaneId
        }
        API.updateFavorite(data)
        .then(response => {
            console.log('update job status response: ', response)
            if (response.status === 200) {
                console.log("job status updated")
            }
        }).catch(error => {
            console.log('remove favorite error: ', error)
        });
    }

    onCardClick(cardId, metadata, laneId) {

        let index = metadata.index;
        this.setState({
            text: [],
            editJob: this.state.jobs[index]
        })
        this.toggleModal();
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

                    for (let i = 0; i < response.data.length; i++) {
                        let job = response.data[i];
                        let eachJob = {
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
                                // jobID: job.jobID
                            }
                        };
                        switch (eachJob.metadata.status) {
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
                    {/************ JUMBOTRON *******************88*/}
                    <Row>
                        <Col size="md-12">
                            <Jumbotron>
                                <h1>
                                    Hello World:
                                </h1>
                                <p>{sessionKey}</p>
                                {/* insert recommended job container and job card components */}
                                <h2>Recommended Jobs (Job Cards) live here - from Swing Table DB Collection</h2>
                                {/* <div>
                                    <Spinner type="grow" color="primary">Loading...</Spinner>
                                </div> */}
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggleTab('1'); }}>
                                            Saved Jobs
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggleTab('2'); }}>
                                            Job Tracker
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggleTab('3'); }}>
                                            Quiz
                                    </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    {/**************** SAVED JOBS **************/}
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col md="3">
                                                <Card>
                                                    <CardHeader>
                                                        <h2>Profile</h2>
                                                    </CardHeader>
                                                </Card>
                                            </Col>
                                            <Col sm="9">
                                                <Card >
                                                    <CardHeader>
                                                        <h2>Favorite Jobs</h2>
                                                    </CardHeader>
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
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    {/**************** JOB TRACKER BOARD **************/}
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col lg="12">
                                                <Board data={data} onCardClick={this.onCardClick} handleDragEnd={this.handleDragEnd} />

                                                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                                                    <ModalHeader toggle={this.toggleModal}>{this.state.editJob.company}</ModalHeader>
                                                    <ModalBody>
                                                        {/* company: "ERNIESYS"
                                                    interest: null
                                                    jobID: "5d6edce5c7861b6c6d0f4c1d"
                                                    location: "Seattle, WA"
                                                    notes: null
                                                    status: "lane3"
                                                    summary: "Number of openings | 01. Position Type | Full Time/Contract. Do you consider yourself a top tier web developer who is looking for your next challenge?"
                                                    title: "UI Developer"
                                                    updated: "2019-09-03T21:36:45.402Z"
                                                    url: "http://www.indeed.com/rc/clk?jk=2a7fb592213d1f99&from=vj&pos=bottom"
                                                    userID: "5d69b194af59245788c8bfac"
                                                    __v: 0
                                                    _id: "5d6edceda3df6d0c107e0d7a"
                                                    __proto__: Object */}
                                                        <Row>
                                                            <Col lg="8">
                                                                <h1>{this.state.editJob.title}</h1>
                                                            </Col>
                                                            <Col lg="4">
                                                                <h4>{this.state.editJob.location}</h4>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg="12">
                                                                <p>{this.state.editJob.summary}</p>
                                                            </Col>
                                                        </Row>
                                                        <Form>
                                                            <Row>
                                                                <Col lg="12">
                                                                    <FormGroup>
                                                                        <Label for="interestSelect">Interest in Position:</Label>
                                                                        <Input type="select" name="select" id="interestSelect" onChange={this.handleInputChange}>
                                                                            <option>Choose...</option>
                                                                            <option value="5">5 - Literal Dream Job!</option>
                                                                            <option value="4">4</option>
                                                                            <option value="3">3</option>
                                                                            <option value="2">2</option>
                                                                            <option value="1">1 - Doesn't Hurt to Apply</option>
                                                                        </Input>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col lg="6">
                                                                    {/* <Button>Link</Button> */}
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col lg="12">
                                                                    <FormGroup>
                                                                        <Label for="noteText">Notes:</Label>
                                                                        <Input type="textarea" name="text" id="noteText" onChange={this.handleInputChange} value={this.state.text} />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Form>

                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.handleFormSubmit}>Save Notes</Button>{' '}
                                                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                                                    </ModalFooter>
                                                </Modal>
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

// Spinner.propTypes = {
//     type: PropTypes.string, // default: 'border'
//     size: PropTypes.string,
//     color: PropTypes.string,
//     className: PropTypes.string,
//     cssModule: PropTypes.object,
//     children: PropTypes.string, // default: 'Loading...'
//   };

export default Profile;


