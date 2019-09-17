import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Redirect } from 'react-router-dom';
import sessions from "../utils/sessions";
import Quiz from "../components/Quiz";

import Job from "../components/Job";
import { List } from "../components/List";

import API from "../utils/API";

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardHeader, Row, Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';
import classnames from 'classnames';

import Board from 'react-trello'
import "../style.css";

import Footer from "../components/Footer";


let loggedIn;
let sessionKey;
let favorites = [];

class Profile extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.onCardDelete = this.onCardDelete.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.quizState = this.quizState.bind(this);
        // this.toggleToast = this.toggleToast.bind(this);

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
            select: "",
            noteIndex: null,
            showToast: false
            // favorites;
            // quizState: []
        };
    }

    // toggleToast() {
    // this.setState({
    // showToast: !this.state.showToast
    // });
    // }

    quizState = event => {
        // alert("Results Saved! Redirecting to search page")
        // this.setState({ quizState: event })
        // console.log(this.state.quizState)
        let array = event;
        let g = [];
        let y = [];
        let r = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i].radio === "g") {
                g.push(array[i].skill)
            } else if (array[i].radio === "y") {
                y.push(array[i].skill)
            } else if (array[i].radio === "r") {
                r.push(array[i].skill)
            }
        }

        let data = {
            id: sessionKey,
            g: g,
            y: y,
            r: r,
            // quiz: { g: g, y: y, r: r }
        }
        console.log(data)

        API.postQuiz(data)
            .then(response => {
                console.log('user quiz results: ', response)
                if (response.status === 200) {
                    // alert("Skills saved! Redirecting to search page")
                }
            }).catch(error => {
                console.log('user quiz error: ', error)
            });

        // this.toggleTab(2);    
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

        //////////// IF THE USER CHANGES THEIR LEVEL OF INTEREST ON THE KANBAN  ///////////////////
        if (this.state.select) {
            let data = {
                id: this.state.editJob._id,
                interest: this.state.select
            }

            API.updateFavorite(data)
                .then(response => {
                    console.log('update user job status response: ', response)
                    if (response.status === 200) {
                        console.log("job interest level updated")
                        window.location.reload();
                    }
                }).catch(error => {
                    console.log('remove favorite error: ', error)
                });
        }

        //////////// IF THE USER TYPES NOTES ON THE KANBAN  ///////////////////
        if (this.state.text) {
            let note = {
                id: this.state.editJob._id,
                text: this.state.text
            }

            API.createNote(note)
                .then(response => {
                    console.log('update note status response: ', response)
                    if (response.status === 200) {
                        console.log("note updated", response)
                        window.location.reload();
                    }
                }).catch(error => {
                    console.log('create note error: ', error)
                });
        }

    };

    removeFavorite(job) {
        console.log("REMOVE FAVORITE", job, job.job._id)
        let fav = {
            id: job.job._id,
        }
        let result = window.confirm("Are you sure you wish to delete this item?");
        if (result) {
            console.log("user wants to delete: ", fav)
            API.removeFavorite(fav)
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

    onCardDelete(cardId, laneId) {
        console.log(cardId);
        for (let i = 0; i < this.state.jobs.length; i++) {
            if (this.state.jobs[i]._id === cardId) {
                let job = { job: this.state.jobs[i] };
                return this.removeFavorite(job)
            }
        }
    }

    deleteNote = i => {
        // event.preventDefault();
        let note = {
            id: this.state.editJob._id,
            note: this.state.editJob.notes[i]
        }
        console.log(note);
        API.deleteNote(note)
            .then(response => {
                console.log('update note status response: ', response)
                if (response.status === 200) {
                    console.log("note updated", response)
                    alert("Note Deleted")
                    // this.toggleToast();
                    // window.location.reload();
                    API.getFavorites({ "userID": sessionKey })
                        .then(response => {
                            console.log('update job status response: ', response)
                            if (response.status === 200) {
                                console.log("job status updated")
                                this.setState({
                                    jobs: response.data,
                                })
                                window.location.reload();
                            }
                        }).catch(error => {
                            console.log('remove favorite error: ', error)
                        });

                }
            }).catch(error => {
                console.log('create note error: ', error)
            });
    }

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
                // let favorites = [];
                console.log('favorite Job response: ', response)
                if (response.status === 200) {
                    //   alert("job added to favorites!")

                    for (let i = 0; i < response.data.length; i++) {
                        let job = response.data[i];
                        let eachJob = {
                            id: job._id,
                            title: job.company,
                            description: job.title,
                            label:  job.interest ? ( "Priority: " + job.interest  ):("") ,
                            // label: job.location,
                            // draggable: true,
                            laneDraggable: false,
                            metadata: {
                                status: job.status,
                                index: i,
                                url: job.url,
                                interest: job.interest,
                                notes: job.notes
                                // date: job.date
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
                        favorites.push(response.data[i].url)


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
                    label: this.state.lane1.length + " Jobs",
                    cards: this.state.lane1,
                    style: {color: '#231824', backgroundColor: '#b8c1ca'},
                    cardStyle: {color: '#AA4154', backgroundColor: '#F5F7F5'}
                },
                {
                    id: 'lane2',
                    title: 'Application Sent',
                    label: this.state.lane2.length + " Jobs",
                    cards: this.state.lane2,
                    style: {color: '#231824', backgroundColor: '#D1F73C'}

                    //     [
                    //     {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
                    //     {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
                    //   ]
                },
                {
                    id: 'lane3',
                    title: 'Response Received',
                    label: this.state.lane3.length + " Jobs",
                    cards: this.state.lane3
                },
                {
                    id: 'lane4',
                    title: 'Had Phone Interview',
                    label: this.state.lane4.length + " Jobs",
                    cards: this.state.lane4
                },
                {
                    id: 'lane5',
                    title: 'Had Live Interview',
                    label: this.state.lane5.length + " Jobs",
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
                <Container className="mx-auto">
                    {/************ JUMBOTRON *******************88*/}
                    {/* <div className="p-3 my-2 rounded bg-docs-transparent-grid">
                        <Toast isOpen={this.state.showToast}>
                        <ToastHeader toggle={this.toggleToast}>
                            Reactstrap
                        </ToastHeader>
                        <ToastBody>
                            This is a toast on a gridded background — check it out!
                        </ToastBody>
                        </Toast>
                    </div> */}
                    <Row>
                        <Col size="md-10" >
                            <Jumbotron className="Jumbotron">
                                <h2 className="p-2 text-center" id="profileJumbo">
                                Save Jobs, Track Application Progress &amp;<strong> Get Hired!</strong>
                                </h2>
                                {/* <h2 className="float-right text-right">Save Jobs, Track Application Progress<br /><strong>&amp; Get Hired!</strong></h2> */}
                                {/* <img className="float-right pt-5" id="logo2" src={process.env.PUBLIC_URL + '/suitedLogo2.png'}/> */}
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="12">
                            <div>
                                <Nav pills className="my-4">
                                    <NavItem >
                                        <NavLink
                                            className="profilePill"
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggleTab('1'); }}>
                                            Skills &amp; Jobs
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
                                            Start Fresh
                                    </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    {/**************** SAVED JOBS **************/}
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col md="3">
                                                <Card id="profCard">
                                                    <CardHeader className="CardHeader">
                                                        <h2>Profile</h2>
                                                    </CardHeader>
                                                    <Form className="pl-3">
                                                    <FormGroup row>
                                                    <Col sm={10}>
                                                        <Input type="text" name="Fname" id="firstName" placeholder="First Name" />
                                                    </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                    <Col sm={10}>
                                                        <Input type="text" name="Lname" id="lastName" placeholder="Last Name" />
                                                    </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                    <Col sm={10}>
                                                        <Input type="text" name="City" id="City" placeholder="City" />
                                                    </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                    <Col sm={10}>
                                                        <Input type="text" name="State" id="State" placeholder="State" />
                                                    </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                    <Col sm={10}>
                                                        <Input type="text" name="Zip_Code" id="Zip_Code" placeholder="Zip Code" />
                                                    </Col>
                                                    </FormGroup>
                                                    <Button className="personalBtn float-right m-3">Submit</Button>
                                                </Form>
                                                </Card>
                                            </Col>
                                            <Col md="9">
                                                <Card id="profCard2">
                                                    <CardHeader className="CardHeader">
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
                                                                    onClick={() => this.removeFavorite({ job })}
                                                                    // profile="true"
                                                                    favorites={favorites}
                                                                    index={i}
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
                                    <TabPane tabId="2" >
                                        <Row>
                                            <Col lg="12" className="profKanbanContainer p-3 mx-0">
                                            <h2 className="CardHeader">Job Tracker</h2>
                                                <Board data={data} onCardClick={this.onCardClick} handleDragEnd={this.handleDragEnd} onCardDelete={this.onCardDelete} id="quizKanban" className="boardContainer" laneStyle={{ backgroundColor: '#b8c1ca' }} style={{ backgroundColor: '#F5F7F5' }} />
                                                {/* onClick={() => this.removeFavorite({ job })} */}
                                                <Modal className="modal" isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                                                    <ModalHeader toggle={this.toggleModal}>{this.state.editJob.company}</ModalHeader>
                                                    <ModalBody className="modalBody">
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
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label for="interestSelect"><h4>Application Priority</h4></Label>
                                                                        <Input type="select" name="select" id="interestSelect" onChange={this.handleInputChange}>
                                                                            <option>Update...</option>
                                                                            <option value="1">1 - Literal Dream Job!</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5 - Doesn't Hurt to Apply</option>
                                                                        </Input>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="6">
                                                                    <h4>{this.state.editJob.interest}</h4>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col lg="12">
                                                                    <FormGroup>
                                                                        <Label for="noteText">Add a New Note:</Label>
                                                                        <Input type="textarea" name="text" id="noteText" onChange={this.handleInputChange} value={this.state.text} />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12">
                                                                    {/* <p>{this.state.editJob.notes}</p> */}
                                                                    {this.state.editJob.notes ? (
                                                                        <div>
                                                                            <h4>Notes:</h4>
                                                                            {this.state.editJob.notes.map((note, i) => (
                                                                                <Row>
                                                                                    <Col md="1">
                                                                                        <p>{i + 1})</p>
                                                                                    </Col>
                                                                                    <Col md="9">
                                                                                        <p key={this.state.editJob._id}>{note}</p>
                                                                                    </Col>
                                                                                    <Col md="1">
                                                                                        <Button close onClick={() => this.deleteNote(i)} />
                                                                                    </Col>
                                                                                </Row>
                                                                            ))}
                                                                        </div>
                                                                        // <p>Test</p>
                                                                    ) : (
                                                                            <p>No notes yet</p>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button id="modalSubmit" onClick={this.handleFormSubmit}>Save</Button>{' '}
                                                        <Button id="modalCancel" onClick={this.toggleModal}>Cancel</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </Col>
                                        </Row>
                                    </TabPane>

                                    {/**************** SKILL QUIZ **************/}
                                    <TabPane tabId="3">
                                        {/* <Row>
                                            <Col sm="12"> */}

                                        <Quiz onClick={this.quizState} />
                                        {/* </Col>
                                        </Row> */}
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>
                    <Footer />

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


