import React from "react";
import { ListItem } from "../List";
// import { Row, Col } from "../Grid";
import "./style.css";
import sessions from "../../utils/sessions"
import API from "../../utils/API";

import { Row, Col } from 'reactstrap';


let loggedIn;
let sessionKey;
let isFavorite = false;



function Job({ title, company, location, date, summary, greenMatches, yellowMatches, redMatches, url, onClick, search, favorites, index, button }) {
  sessionKey = sessions.getSession();

  if (sessionKey) {
    loggedIn = true;
    // console.log(favorites, index);

    for (let i = 0; i < favorites.length; i++) {
      let favURL = favorites[i];
      let urlA = url;
      if ( favURL == urlA) {
         isFavorite = true;
      } 
    }

  } else {
    loggedIn = false;
    isFavorite = false;
  }

  // console.log(isFavorite);

  

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
                <a className="btn btn-light cardButton ml-1" target="_blank" rel="noopener noreferrer" href={url}>
                <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
              {/* { isFavorite ? (  */}
              <section>
              <div className="btn-container" data-toggle="buttons">
              <button onClick={onClick} className="btn btn-light heartBtn" id={url} rel="noopener noreferrer" >
              <i class="fas fa-heart"></i>
              </button>
            </div>
            </section>
              {/* ):(
              <section> 
              <div className="btn-container" data-toggle="buttons">
                <button close onClick={onClick} className="btn btn-light" id={url} rel="noopener noreferrer">
                  Delete
                </button>
                    </div>
                  </section>
                )}
 */}
            </section>
          ) : (
              <section>
                <div className="btn-container">
                  <a className="btn btn-light" target="_blank" rel="noopener noreferrer" href={url}>
                  <i class="fas fa-external-link-alt"></i>

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
        </Col>
      </Row>
      <Row>
        <Col size="12 sm-8 md-10">
          <p>{summary}</p>
        </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <h6 id="greenMatchesCardDisplay">{greenMatches}</h6>
          </Col>
          <Col size="md-4">
            <h6 id="yellowMatchesCardDisplay">{yellowMatches}</h6>
          </Col>
          <Col size="md-4">
            <h6 id="redMatchesCardDisplay">{redMatches}</h6>
          </Col>
        </Row>
      
    </ListItem>
  );
}

export default Job;
