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
let favoriteIDs = [];


class Search extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.favoriteJob = this.favoriteJob.bind(this);
    this.favoriteBtn = this.favoriteBtn.bind(this);

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
      message: "Enter in your desired job to begin!",
      loading: false,
      lanes: [],
      favoriteJob: [],
      updateDB: false,
      redFilter: true,
      favorites: []
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
        // const notMyList = lane3;
        let presort = res.data;


        // if(this.state.redFilter==true){
        //     res.data.map(job => {
        //     const red = job.red.filter(a => !notmyList.includes(a))})
        //     job.red = red;
        //     return job;

        // }

        if (this.state.redFilter == false) {
          presort = res.data.filter(j => j.red.length == 0)
          console.log(presort);
          //  return presort;
        }

        const sorted = presort.map(job => {
          // let sorted = res.data.map(job => {
          //   const green = job.green.filter(j => myList.includes(j));
          //   const red = job.red.filter(j => notMyList.includes(j));

          //   job.green = green;
          //   job.red = red;

          const green = job.green.filter(j => myList.includes(j));
          job.green = green;

          return job;

          //   else {
          //     const green = job.green.filter(j => myList.includes(j));
          //     const red = job.red.filter(j => notMyList.includes(j));

          //     job.green = green;
          //     job.red = red; 
          //     console.log('Red:' +job.red + 'Green:' +job.green)
          //     const 

          //     return filterJob;
          //   }

        })
          .sort((x, y) => y.green.length - x.green.length)

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


  favoriteBtn(url) {
    // console.log(this.state.favorites);
    let fav = {};
    let elem = document.getElementById(url)
    let favoriteJobBtn = this.state.favorites;

    // let index = null;

    // console.log("value", elem.value, "val", elem.val, "innerText", elem.innerText, elem.innerHTML, elem.html);
    // let favorites = this.state.favorites;
    // favorites = favorites.splice(index)
    // this.setState({favorites: favorites})
    for (let i = 0; i < favoriteIDs.length; i++) {
      if (url === favoriteIDs[i].url) {
        fav = { id: favoriteIDs[i].id };
        console.log(elem.innerHTML)
        if (elem.innerHTML == '<i class="fas fa-heart"></i>') {
          elem.innerHTML = '<i class="far fa-heart"></i>';
        }

      }
    }

    let result = window.confirm("Are you sure want to remove this job from favorites?");
    if (result) {
      console.log("user wants to delete: ", fav)
      API.removeFavorite(fav)
        .then(response => {
          // console.log('remove favorite Job response: ', response)
          if (response.status === 200) {
            console.log("job removed from favorites")
          }
        }).catch(error => {
          console.log('remove favorite error: ', error)
        });
    }
  }

  favoriteJob(job) {
    let elem = document.getElementById(job.job.url)

    if (elem.innerHTML == '<i class="far fa-heart"></i>') {
      elem.innerHTML = '<i class="fas fa-heart"></i>';
    }

    // document.getElementsById(job.job.url).style.backgroundColor = "red";
    console.log(job.job.url);
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
              favorites.push(response.data[i].url);
              favoriteIDs.push({ id: response.data[i]._id, url: response.data[i].url });
            }
            this.setState({ favorites: favorites })

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
    //console.log("redFilterTrue")
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
    event.preventDefault();


    let lane1 = this.state.lanes.filter(a => a.metadata.status == "lane1").map(a => a.id.toLowerCase());
    let lane2 = this.state.lanes.filter(a => a.metadata.status == "lane2").map(a => a.id.toLowerCase());
    let lane3 = this.state.lanes.filter(a => a.metadata.status == "lane3").map(a => a.id.toLowerCase());

    let data = {
      id: sessionKey,
      g: lane1,
      y: lane2,
      r: lane3,

    }
    console.log(data)

    API.postQuiz(data)
      .then(response => {
        if (response.status === 200) {
          alert('Profile Successfully Updated')
        }
      }).catch(error => {
        console.log('Filters not saved. Error: ', error)
      });


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
          style: { backgroundColor: '#D1F73C', border: '3px solid #D1F73C' },
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


              {loggedIn ? (<h2 id="heading" className="mb-4"><strong>Click search to find job titles with your displayed filters.</strong></h2>
                ) : (<h2 id="heading" className="mb-4"><strong>If you would like to save jobs and set up customizable filters. Click up at the top of the page to Login. </strong></h2>)}
              
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                l={this.state.l}
              />
              {loggedIn ? (
              <div>
              <Button id="redbutton" onClick={this.redFilterTrue}> {this.state.redFilter == false ? <i class="far fa-square"></i> : <i class="far fa-check-square"></i>}  Show Jobs with Unideal Skills  </Button>              
              </div>
              ) : ""}
            </Card>

          </Col>
          {loggedIn ? (

            <Col size="md-10 md-offset-1">
              <Card className="p-3 mt-5 rounded-0">


                <h2 id="heading" className="text-center p-1 mb-0"><strong>Filters</strong></h2>
                <h5 id="heading" className="p-1 mb-0">Results will be sorted by jobs with the most desired skills. All skills present in a job entry will be listed with their matching color at the bottom of the job card.</h5>

                <Board data={data} handleDragEnd={this.handleDragEnd} onCardDelete={this.onCardDelete} onCardClick={this.onCardClick} style={{ height: "20rem", overflow: "scroll", backgroundColor: '#F5F7F5' }} className="boardContainer" />
                <br /> <br /> <br />
                <FormSort
                  handleInputChange={this.handleInputChange}
                  handleSortFormSubmit={this.handleSortFormSubmit}
                  skill={this.state.skill}
                />
                <br />
                <Button id="filterBtn" onClick={this.updateDBTrue}>Update Filters To Profile </Button>

              </Card>
            </Col>
          ) : ("")}
        </Row>

        <Row>
          <Col size="md-10 md-offset-1">
            {!loading &&
              <Card className="py-5 my-5 rounded-0">
                {this.state.jobs.length ? (

                  <List>
                    <h2 id="heading" className="text-center"><strong>Results</strong></h2>
                    {this.state.jobs.map((job, i) => (
                      <Job
                        key={job.url}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        // date={(job.date !== undefined && job.date.length > 3) ? <Moment fromNow>{job.date}</Moment> : (job.date !== undefined) ? job.date.slice(0, -1) + " days ago" : job.date}
                        summary={job.summary}
                        greenMatches={job.green.map(sub => (sub + " "))}
                        yellowMatches={job.yellow.map(sub => (sub + " "))}
                        redMatches={job.red.map(sub => (sub + " "))}
                        url={job.url}
                        onClickAdd={() => this.favoriteJob({ job })}
                        onClickDelete={() => this.favoriteBtn(job.url)}
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
            {/* {loading && <Card className="p-5 m-5 rounded-0"><img id="loader" className="text-center" src="https://eric.young.li/img/loading/hexagonRotate-noBorder-copy-2-01.gif" /></Card>} */}
            {loading && <Card className="py-5 my-5 rounded-0"><img id="loader" className="text-center" src="https://mistyharborboats.com/wp-content/plugins/mhb-wizard/js-app/images/ajax-loader.gif" /></Card>}

          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Search;