import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Form from "../components/Form";
import FormSort from "../components/FormSort";
import Jumbotron from "../components/Jumbotron";

import Job from "../components/Job";
import { List } from "../components/List";
import API from "../utils/API";

import Moment from "react-moment";

import Board from 'react-trello'

//for logged in purposes
import sessions from "../utils/sessions"
import { Row, Col, Container, Card, CardHeader, Button, ButtonGroup } from 'reactstrap';
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import "../style.css";

let loggedIn;
let sessionKey;
let favorites = [];


class Search extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.favoriteJob = this.favoriteJob.bind(this);

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.onCardDelete = this.onCardDelete.bind(this);
    this.handleSortFormSubmit = this.handleSortFormSubmit.bind(this);
    this.updateDBTrue = this.updateDBTrue.bind(this);
    this.redFilterTrue = this.redFilterTrue.bind(this);


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
      lanes: [],
      favoriteJob: [],
      updateDB: false,
      redFilter: false,
      favoriteURLs: []
    };
  }



  getJobs = () => {
    this.setState({ loading: true });

    // console.log("lane1=" + JSON.stringify(this.state.lanes.filter(a => a.metadata.status == "lane1").map(a => a.id)))
    // console.log("lane2=" + JSON.stringify(this.state.lanes.filter(a => a.metadata.status == "lane2").map(a => a.id)))
    // console.log("lane3=" + JSON.stringify(this.state.lanes.filter(a => a.metadata.status == "lane3").map(a => a.id)))

    let lane1 = this.state.lanes.filter(a => a.metadata.status == "lane1").map(a => a.id.toLowerCase());
    let lane2 = this.state.lanes.filter(a => a.metadata.status == "lane2").map(a => a.id.toLowerCase());
    let lane3 = this.state.lanes.filter(a => a.metadata.status == "lane3").map(a => a.id.toLowerCase());

    API.getJobs(this.state.q, this.state.l, lane1, lane2, lane3)
      .then(res => {
        const myList = lane1;
        // const notmyList = lane3;
        // if(this.state.redFilter==true){
        //     res.data.map(job => {
        //     const red = job.red.filter(a => !notmyList.includes(a))})
        //     job.red = red;
        //     return job;

        // }
        // const sorted = res.data.map(job => {
        let sorted = res.data.map(job => {
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

  favoriteJob(job) {

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
      // jobID: job.job._id,
      interest: null,
      status: "lane1",
      notes: [],
    }

    let favoriteJob = this.state.favoriteJob;
    favoriteJob.push(userJob);
    this.setState(favoriteJob);
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


  handleSortFormSubmit = event => {
    console.log("this is handle sort form submit")
    event.preventDefault();
    // console.log(this.state.skill)
    let newLanes = this.state.lanes
    newLanes.push({ id: this.state.skill, title: this.state.skill, metadata: { status: "lane2" } })

    this.setState({
      lanes: newLanes,
      skill: "",
    })

  };


  componentDidMount() {
    if (loggedIn) {
      let lanes = [];

      API.getQuiz({ "userID": sessionKey })
        // API.getFavorites(sessionKey)
        .then(response => {
          ////////////////////////////////////////////////////////////
          // console.log('quiz response: ', response)
          if (response.status === 200) {

            for (let i = 0; i < response.data.g.length; i++) {
              let res = {
                id: response.data.g[i],
                title: response.data.g[i],
                metadata: { status: "lane1" }
              }
              lanes.push(res);
            }
            for (let i = 0; i < response.data.y.length; i++) {
              let res = {
                id: response.data.y[i],
                title: response.data.y[i],
                metadata: { status: "lane2" }
              }
              lanes.push(res);
            }
            for (let i = 0; i < response.data.r.length; i++) {
              let res = {
                id: response.data.r[i],
                title: response.data.r[i],
                metadata: { status: "lane3" }
              }
              lanes.push(res);
            }

            this.setState({
              lanes: lanes,
              g: response.data.g,
              y: response.data.y,
              r: response.data.r

            })

          }

        }).catch(error => {
          alert('get quiz error: ', error)
        });


      ///////////////get favorites///////////////////
      API.getFavorites({ "userID": sessionKey })
        .then(response => {
          console.log('job - get favorites response: ', response.data)
          if (response.status === 200) {
            for (let i = 0; i < response.data.length; i++) {
              favorites.push(response.data[i].url)
            }
          }
        }).catch(error => {
          console.log('job - get favorite error: ', error)
        });
    };
  };



  handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
    // console.log("state before: " + JSON.stringify(this.state));

    let card = this.state.lanes.filter(a => (a.id === cardDetails.id))[0];
    console.log("card: " + JSON.stringify(card));
    card.metadata.status = targetLaneId;

    this.setState({
      lanes: this.state.lanes
    })

  }


  onCardDelete(cardId, laneId) {
    console.log(cardId, this.state.lanes);
    let deleteArray = this.state.lanes.filter(a => (a.id !== cardId));

    this.setState({
      lanes: deleteArray
    })
  }



  redFilterTrue = event => {
    event.preventDefault();
    console.log("redFilterTrue")
    if (this.state.redFilter == true) {
      this.setState({
        redFilter: false
      })
    }
    else {
      this.setState({
        redFilter: true
      })
    }
  }


  updateDBTrue = event => {
    console.log("updateDBTrue")
    event.preventDefault();
    if (this.state.updateDB == true) {
      this.setState({
        updateDB: false
      })
    }
    else {
      this.setState({
        updateDB: true
      })
    }

  }


  render() {
    // let lane1 = this.state.lanes.filter(a => a.metadata.status === "lane1");
    // let lane2 = this.state.lanes.filter(a => a.metadata.status === "lane2");
    // let lane3 = this.state.lanes.filter(a => a.metadata.status === "lane3");
    // const data = {
    //   lanes: [
    //     {
    //       id: 'lane1',
    //       title: 'Desired Skills',
    //       label: lane1.length,
    //       style: { backgroundColor: 'green' },
    //       cards: lane1
    //     },
    //     {
    //       id: 'lane2',
    //       title: 'Interested Skills',
    //       label: lane2.length,
    //       style: { backgroundColor: 'yellow' },
    //       cards: lane2
    //     },
    //     {
    //       id: 'lane3',
    //       title: 'Unideal Skills',
    //       label: lane3.length,
    //       style: { backgroundColor: 'red' },
    //       cards: lane3
    //     },

    //   ]
    // }

    let lane1 = this.state.lanes.filter(a => a.metadata.status === "lane1");
    let lane2 = this.state.lanes.filter(a => a.metadata.status === "lane2");
    let lane3 = this.state.lanes.filter(a => a.metadata.status === "lane3");
    const data = {
        lanes: [
            {
                id: 'lane1',
                title: 'Desired Skills',
                label: lane1.length,
                style: { backgroundColor: '#D1F73C', border: '3px solid #D1F73C'},
                cards: lane1
            },
            {
                id: 'lane2',
                title: 'Interested Skills',
                label: lane2.length,
                style: { backgroundColor: '#b8c1ca', border: '3px solid #b8c1ca' },
                cards: lane2
            },
            {
                id: 'lane3',
                title: 'Unideal Skills',
                label: lane3.length,
                style: { backgroundColor: '#AA4154', border: '3px solid #AA4154' },
                cards: lane3
            },
        ]
    }


    sessionKey = sessions.getSession();

    if (sessionKey) {
      loggedIn = true;

    } else {
      loggedIn = false;

    }



    const { loading } = this.state;

    return (
      <Container fluid id="search">
        <Row>
          <Col size="md-10 md-offset-1">
            <Card className="p-4 mt-5 rounded-0">
              <h1>Job Search</h1>
              <h2 id="heading" className="mb-4"><strong>Click Search to Find Job Titles with your Displayed Filters</strong></h2>

              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                l={this.state.l}
              />

              {/* {loggedIn ? (<div>
                            <Button color="primary" onClick={() => this.redFilterTrue} active={this.state.cSelected}>Exclude Jobs with Unideal Skills</Button>
                            <Button color="primary" onClick={() => this.updateDBTrue} active={this.state.cSelected}>Update Filterrs To Profile</Button>
                            </div>
                            ) : ""} */}
            </Card>

          </Col>
          {loggedIn ? (

            <Col size="md-10 md-offset-1">
              <Card className="p-3 mt-5 rounded-0">


                <h2 id="heading" className="text-center p-1 mb-0"><strong>Filters</strong></h2>

                <Board data={data} handleDragEnd={this.handleDragEnd} onCardDelete={this.onCardDelete} onCardClick={this.onCardClick} style={{ height: "25rem", overflow: "scroll" }} className="boardContainer" />
                <br /> <br /> <br />
                <FormSort
                  handleInputChange={this.handleInputChange}
                  handleSortFormSubmit={this.handleSortFormSubmit}
                  skill={this.state.skill}
                />

              </Card>
            </Col>
          ) : ("")}
        </Row>

        <Row>
          <Col size="md-10 md-offset-1">
            {!loading &&
              <Card className="p-5 m-5 rounded-0">
                {this.state.jobs.length ? (

                  <List>
                    <h2 id="heading" className="text-center"><strong>Results</strong></h2>
                    {this.state.jobs.map((job, i) => (
                      <Job
                        key={i}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        date={(job.date !== undefined && job.date.length > 3) ? <Moment fromNow>{job.date}</Moment> : (job.date !== undefined) ? job.date.slice(0, -1) + " days ago" : job.date}
                        summary={job.summary}
                        greenMatches={job.green.map(sub => (sub + " "))}
                        yellowMatches={job.yellow.map(sub => (sub + " "))}
                        redMatches={job.red.map(sub => (sub + " "))}
                        url={job.url}
                        onClick={() => this.favoriteJob({ job })}
                        search="true"
                        favorites={favorites}
                        index={i}
                      />
                    ))}
                  </List>

                ) : (

                    <h2 className="text-center">{this.state.message}</h2>
                  )}
              </Card>
            }
            {/* {loading && <h2 className="text-center">Jobs Loading</h2>} */}
            {loading && <Card className="p-5 m-5 rounded-0"><img id="loader" className="text-center" src="https://loading.io/spinners/microsoft/lg.rotating-balls-spinner.gif" /></Card>}
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <Footer />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;