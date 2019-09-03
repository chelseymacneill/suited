import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Redirect } from "react-router-dom";
import sessions from "../utils/sessions";
import Quiz from "../components/Quiz";

import Card from "../components/Card";
import Job from "../components/Job";
import { List } from "../components/List";

import API from "../utils/API";

let loggedIn;
let sessionKey;

function removeFavorite(job) {
  const id = job.job.jobID;

  let result = window.confirm("Are you sure you wish to delete this item?");
  if (result) {
    console.log("user wants to delete");
    // API.removeFavorite({ jobID: id })
    // .then(response => {
    //     console.log('remove favorite Job response: ', response)
    //     if (response.status === 200) {
    //         console.log("job removed from favorites")
    //     }
    // }).catch(error => {
    //     console.log('remove favorite error: ', error)
    // });
  }
}

class Profile extends Component {
  state = {
    jobs: [],
    message: "No Jobs saved yet, please use the search page"
  };
  componentDidMount() {
    //GET USER DATA HERE
    // console.log(JSON.stringify(req.headers));
    console.log("success!");
    API.getFavorites({ userID: sessionKey })
      .then(response => {
        console.log("favorite Job response: ", response);
        if (response.status === 200) {
          //   alert("job added to favorites!")
          this.setState({
            jobs: response.data
          });
        }
        console.log(this.state);
      })
      .catch(error => {
        // alert('create favorite error: ', error)
      });
  }

  render() {
    sessionKey = sessions.getSession();
    if (sessionKey) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }

    if (loggedIn === false) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Hello World: {sessionKey}</h1>
                {/* insert recommended job container and job card components */}
                <h2>
                  Recommended Jobs (Job Cards) live here - from Swing Table DB
                  Collection
                </h2>
              </Jumbotron>
            </Col>
          </Row>

          <Row>
            <Col size="md-10 md-offset-1">
              <Quiz userID={sessionKey} />
            </Col>
          </Row>
          <Row>
            <Col size="md-4">
              {/* insert user card component */}
              <h2>User Profile Details</h2>
            </Col>
            <Col size="md-8">
              {/* insert job container and job card components */}
              <h2>Job Cards live here - from Swing Table DB Collection</h2>
              <Card title="Saved Jobs">
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
                        onClick={() => removeFavorite({ job })}
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
}

export default Profile;
