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



function Job({ title, company, location, date, summary, greenMatches, yellowMatches, redMatches, url, onClickAdd, onClickDelete, search, favorites, index, button }) {
  sessionKey = sessions.getSession();
  isFavorite = false;

  if (sessionKey) {
    loggedIn = true;
    // console.log(url, index);

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] === url) {
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
              { search ? ( 
                //if we're on the search page, display hearts
               isFavorite ? (
                 //if it is a favorite, display full heart
                <section>
                <div className="btn-container" data-toggle="buttons">
                <button onClick={onClickDelete} className="btn btn-light heartBtn" id={url} rel="noopener noreferrer" >
                <i class="fas fa-heart"></i>
                </button>
                </div>
                </section>
               ):(
                 //if it isn't, display empty heart
                <section>
                <div className="btn-container" data-toggle="buttons">
                <button onClick={onClickAdd} className="btn btn-light heartBtn" id={url} rel="noopener noreferrer" >
                <i class="far fa-heart"></i>
                </button>
                </div>
                </section>
               )
               ):(
                 //if we aren't on the search page, we're on the prof page, display trashcan
              <section> 
              <div className="btn-container" data-toggle="buttons">
                <button close onClick={onClickDelete} className="btn btn-light trashBtn" id={url} rel="noopener noreferrer">
                <i class="fas fa-trash"></i>
                </button>
                    </div>
                  </section>
                )}
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
