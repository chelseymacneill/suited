import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Form from "../components/Form";
import FormSort from "../components/FormSort";
// import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

import BP_Card from "../components/BP_Card";
import Job from "../components/Job";
import { List } from "../components/List";
import API from "../utils/API";

import Moment from "react-moment";

import Board from 'react-trello'

//for logged in purposes
import sessions from "../utils/sessions"

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardGroup, CardColumns, CardText, Row, Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';



let loggedIn;
let sessionKey;

function favoriteJob(job) {

  let userJob = {
    url: job.job.url,
    title: job.job.title,
    company: job.job.company,
    location: job.job.location,
    summary: job.job.summary,
    // date: job.job.date,
    // ratings: job.job.ratings,
    // salary: job.job.salary,
    /////////////new user specific things//////////////////
    userID: sessionKey,
    jobID: job.job._id,
    interest: null,
    status: "lane1",
    notes: [],
  }

  //   console.log(dummyJob);
  API.postUserJob(userJob)
    .then(response => {
      console.log('favorite Job response: ', response)
      if (response.status === 200) {
        alert("job added to favorites!")
      }
    }).catch(error => {
      alert('create favorite error: ', error)
    });
}

class Search extends Component {

  constructor(props) {
    super(props)

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.onCardDelete = this.onCardDelete.bind(this);
    this.handleSortFormSubmit = this.handleSortFormSubmit.bind(this);

    this.state = {
      jobs: [],
      q: "",
      l: "",
      skill: "",
      // these are the green words
      g: ["javascript"],
      // these are the yellow words
      y: ["css"],
      // these are the red words
      r: ["html"],
      message: "Enter in your desired Job to begin!",
      loading: false,
      lanes: []
    };
  }



  getJobs = () => {
    this.setState({ loading: true });

    console.log("lane1=" + JSON.stringify(this.state.lanes.filter(a => a.metadata.status == "lane1").map(a => a.id)))
    console.log("lane2=" + JSON.stringify(this.state.lanes.filter(a => a.metadata.status == "lane2").map(a => a.id)))
    console.log("lane3=" + JSON.stringify(this.state.lanes.filter(a => a.metadata.status == "lane3").map(a => a.id)))

    let lane1 = this.state.lanes.filter(a => a.metadata.status == "lane1").map(a => a.id);
    let lane2 = this.state.lanes.filter(a => a.metadata.status == "lane2").map(a => a.id);
    let lane3 = this.state.lanes.filter(a => a.metadata.status == "lane3").map(a => a.id);

    console.log(lane1, lane2, lane3);

    // *** Don't think we need to update g,y,r in state...
    /*
    this.setState({
        g: lane1,
        y: lane2,
        r: lane3

    }, ()=> {
    */
    console.log(lane1, lane2, lane3);
    API.getJobs(this.state.q, this.state.l, lane1, lane2, lane3)
      .then(res => {
        const myList = lane1;
        const sorted = res.data.map(job => {
          const green = job.green.filter(j => myList.includes(j));
          job.green = green;
          return job;
        }).sort((x, y) => y.green.length - x.green.length)
        this.setState({
          jobs: sorted,
          loading: false
        })
      }
      )
      .catch((err) => {
        console.log(err);
        this.setState({
          jobs: [],
          message: "No New Jobs Found, Try a Different Query"
        })
      });
    // })



  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.getJobs();
  };



  handleSortFormSubmit = event => {
    console.log("this is handle sort form submit")
    event.preventDefault();
    console.log(this.state.skill)
    let newLanes = this.state.lanes
    newLanes.push({ id: this.state.skill, title: this.state.skill, metadata: { status: "lane2" } })
    this.setState({
      lanes: newLanes,
      skill: ""
    })
  };


  componentDidMount() {
    let lanes = [];
    for (let i = 0; i < this.state.g.length; i++) {
      let res = {
        id: this.state.g[i],
        title: this.state.g[i],
        metadata: { status: "lane1" }
      }
      lanes.push(res);
    }
    for (let i = 0; i < this.state.y.length; i++) {
      let res = {
        id: this.state.y[i],
        title: this.state.y[i],
        metadata: { status: "lane2" }
      }
      lanes.push(res);
    }
    for (let i = 0; i < this.state.r.length; i++) {
      let res = {
        id: this.state.r[i],
        title: this.state.r[i],
        metadata: { status: "lane3" }
      }
      lanes.push(res);
    }

    this.setState({
      lanes: lanes
    })
  };



  handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
    // console.log("state before: " + JSON.stringify(this.state));

    let card = this.state.lanes.filter(a => (a.id === cardDetails.id))[0];
    console.log("card: " + JSON.stringify(card));
    card.metadata.status = targetLaneId;

    this.setState({
      lanes: this.state.lanes
    })

    // console.log("state after: " + JSON.stringify(this.state));
  }

  // onCardClick(cardId, metadata, laneId) {

  //     console.log(cardId, laneId);
  // }

  onCardDelete(cardId, laneId) {
    console.log(cardId, this.state.lanes);
    let deleteArray = this.state.lanes.filter(a => (a.id !== cardId));

    this.setState({
      lanes: deleteArray
    })


  }






  render() {
    let lane1 = this.state.lanes.filter(a => a.metadata.status === "lane1");
    let lane2 = this.state.lanes.filter(a => a.metadata.status === "lane2");
    let lane3 = this.state.lanes.filter(a => a.metadata.status === "lane3");
    const data = {
      lanes: [
        {
          id: 'lane1',
          title: 'Desired Skills',
          label: lane1.length,
          style: { backgroundColor: 'green' },
          cards: lane1
        },
        {
          id: 'lane2',
          title: 'Interested Skills',
          label: lane2.length,
          style: { backgroundColor: 'yellow' },
          cards: lane2
        },
        {
          id: 'lane3',
          title: 'Unideal Skills',
          label: lane3.length,
          style: { backgroundColor: 'red' },
          cards: lane3
        },

      ]
    }


    sessionKey = sessions.getSession();
    if (sessionKey) {
      loggedIn = true;
      // console.log("logged in: ", sessionKey)
    } else {
      loggedIn = false;
      // console.log("no user logged in")
    }

    const { loading } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Hello World: Search Bar Here
              </h1>

              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                l={this.state.l}
              />
            </Jumbotron>
            <FormSort
              handleInputChange={this.handleInputChange}
              handleSortFormSubmit={this.handleSortFormSubmit}
              skill={this.state.skill}
            />
            <Board data={data} handleDragEnd={this.handleDragEnd} onCardDelete={this.onCardDelete} onCardClick={this.onCardClick} />
          </Col>
        </Row>
        <Row>
          <h2 className="text-center">{this.state.message}</h2>
          <Col size="md-10 md-offset-1">
            {/* insert search filter component */}
            <h2>Search Filter goes here</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {/* insert job container and job BP_card components */}
            <h2>Job Cards live here - from Job DB Collection</h2>
            {!loading &&
              <BP_Card title="Results">
                {this.state.jobs.length ? (
                  <List>
                    {this.state.jobs.map(job => (
                      <Job
                        key={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        date={(job.date !== undefined && job.date.length > 3) ? <Moment fromNow>{job.date}</Moment> : (job.date !== undefined) ? job.date.slice(0, -1) + " days ago" : job.date}
                        //   <Moment date={job.date} />
                        summary={job.summary}
                        // positiveMatches={job.subject.map(sub => (sub + " "))}
                        greenMatches={job.green.map(sub => (sub + " "))}
                        yellowMatches={job.yellow.map(sub => (sub + " "))}
                        redMatches={job.red.map(sub => (sub + " "))}
                        url={job.url}
                        onClick={() => favoriteJob({ job })}
                        search="true"
                      />
                    ))}
                  </List>
                ) : (

                    <h2 className="text-center">{this.state.message}</h2>
                  )}
              </BP_Card>
            }
            {/* {loading && <h2 className="text-center">Jobs Loading</h2>} */}
            {loading && <img src="https://loading.io/spinners/microsoft/lg.rotating-balls-spinner.gif" />}
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {/* insert footer component */}
            <h2>Footer Down at the bottom</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;