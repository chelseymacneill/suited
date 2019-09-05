import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Form from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

import BP_Card from "../components/BP_Card";
import Job from "../components/Job";
import { List } from "../components/List";
import API from "../utils/API";

import Moment from "react-moment";

import Board from 'react-trello'

//for logged in purposes
import sessions from "../utils/sessions"

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
        notes: null
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

    state = {
        jobs: [],
        q: "",
        l: "",
        // these are the green words
        g: ["html", "css", "crazy", "javascript", "bootstrap", "react"],
        // these are the yellow words
        y: ["html", "css", "javascript"],
        // these are the red words
        r: ["bootstrap", "react"],
        message: "Enter in your desired Job to begin!",
        loading: false,
        lane1: [],
        lane2: [],
        lane3: []
    };

    getJobs = () => {
        this.setState({ loading: true });
        API.getJobs(this.state.q, this.state.l, this.state.g, this.state.y, this.state.r)
            .then(res => {
                const myList = this.state.g;
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

    componentDidMount (){
        let lane1 = [];
        let lane2 = [];
        let lane3 = [];

      
        console.log(lane1);
        for (let i = 0; i < this.state.g.length; i++) {
            let res = {
                id: this.state.g[i],
                title: this.state.g[i],
            }
            lane1.push(res);
        }
        console.log(lane1);
    }


    render() {
        const data = {
            lanes: [
              {
                id: 'lane1',
                title: 'Desired Skills',
                label: '2/2',
                cards: [
                  {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
                  {id: 'javascript', title: 'javascript'}
                ]
              },
              {
                id: 'lane2',
                title: 'Interested Skills',
                label: '0/0',
                cards: []
              },
              {
                id: 'lane3',
                title: 'Unideal Skills',
                label: '0/0',
                cards: []
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
                            <Board data={data} />
                        </Jumbotron>
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