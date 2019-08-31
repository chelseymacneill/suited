import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Form from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

import Card from "../components/Card";
import Job from "../components/Job";
import { List } from "../components/List";
import API from "../utils/API";

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
    status: null
  }

//   console.log(dummyJob);
  API.postUserJob(userJob)
        .then( response => {
            console.log('favorite Job response: ', response)
            if (response.status === 200) {
              alert("job added to favorites!")
            } 
        }).catch(error => {
            alert('create favorite error: ', error)
        });
}

class Search extends Component {
  // state = {
  //     book: {}
  // };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  // componentDidMount() {
  //     API.getBook(this.props.match.params.id)
  //         .then(res => this.setState({ book: res.data }))
  //         .catch(err => console.log(err));
  // }

  state = {
    jobs: [],
    q: "",
    l: "",
    message: "Enter in your desired Job to begin!"
  };

  getJobs = () => {
    API.getJobs(this.state.q, this.state.l)
      .then(res =>
        this.setState({
          jobs: res.data
        })
      )
      .catch(() =>
        this.setState({
          jobs: [],
          message: "No New Jobs Found, Try a Different Query"
        })
      );
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
  
  

  render() {
    sessionKey = sessions.getSession();
    if (sessionKey) {
      loggedIn = true;
      // console.log("logged in: ", sessionKey)
    } else {
      loggedIn = false;
      // console.log("no user logged in")
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Hello World: Search Bar Here
              </h1>
              {/* <button onClick={() => favoriteJob("test")} className="btn btn-light" rel="noopener noreferrer">Test</button> */}

              {/* <input className="form-control" type="text" placeholder="Default input"></input> */}
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                l={this.state.l}
              />
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
            {/* insert job container and job card components */}
            <h2>Job Cards live here - from Job DB Collection</h2>

            <Card title="Results">
              {this.state.jobs.length ? (
                <List>
                  {this.state.jobs.map(job => (
                    <Job
                      key={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      date={job.date}
                      summary={job.summary}
                      url={job.url}
                      onClick={() => favoriteJob({job})}
                    //   Button={() => (
                    //     <button
                    //       onClick={() => this.handleBookSave(book.id)}
                    //       className="btn btn-primary ml-2"
                    //     >
                    //       Save
                    //     </button>
                    //   )}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
            </Card>

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