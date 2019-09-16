import React from "react";
import {Row, Col} from "reactstrap";

function Footer() {
  return (
    <footer>
      <hr />
      <Row>
        <Col md="2">
        <h6>
        <a href="https://github.com/chelseymacneill/suited"><i className="fab fa-github"/>&nbsp;GitHub Repo</a>
        </h6>
        </Col>
        <Col md="8" className="text-center">
        <h6>
        <a href="https://ptmceneaney.github.io/updated-portfolio/"><i class="fas fa-external-link-alt"></i>&nbsp;Page McEneaney</a>
        &nbsp;&nbsp;
        <a href="https://github.com/SamanthaAO/portfolio-update"><i class="fas fa-external-link-alt"></i>&nbsp;Samantha Orcutt</a>
        </h6>
        </Col>
        <Col md="2">

        </Col>
      </Row>
      
    </footer>
  );
}

export default Footer;
