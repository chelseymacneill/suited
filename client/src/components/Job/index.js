import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";
import sessions from "../../utils/sessions";
//import Moment from 'react-moment';

let loggedIn;
let sessionKey;

function Job({ key, title, company, location, date, summary, url, onClick, API}) {
  sessionKey = sessions.getSession();
  if (sessionKey) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{title}</h3>
          <h5 className="font-italic">{company}</h5>
        </Col>
        <Col size="md-4">
           
          {loggedIn ? (
            <section>
              <div className="btn-container">
                <a className="btn btn-light" target="_blank" rel="noopener noreferrer" href={url}>
                  View
                </a>
              </div>
              <div className="btn-container">
                <button onClick={onClick} className="btn btn-light" rel="noopener noreferrer">
                  Favorite
                </button>
              </div>
            </section>
          ) : (
            <section>
              <div className="btn-container">
                <a className="btn btn-light" target="_blank" rel="noopener noreferrer" href={url}>
                  View
                  </a>
              </div>
            </section>
            )}
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <h5 className="font-italic">{location}</h5>
          <h5 className="font-italic">{date}</h5>
          {/* <h5 className="font-italic">Moment: {<Moment fromNow>{date}</Moment>} API: {date} </h5> */}
        </Col>
      </Row>
      <Row>
        <Col size="12 sm-8 md-10">
          <p>{summary}</p>
        </Col>
      </Row>
    </ListItem>
  );
}

export default Job;
