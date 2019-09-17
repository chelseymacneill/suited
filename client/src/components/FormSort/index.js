import React from "react";
import {Row, Col} from 'reactstrap';
import "./style.css";

function FormSort({ skill, handleInputChange, handleSortFormSubmit }) {
  return (
    <form>
    <Row >
    <Col  className="col-sm-9 pl3">
      <div className="form-group">
        <label htmlFor="Skill" id="formTitle">
          <strong>Enter the Skill You Would Like to Add to Filters</strong>
        </label>
        <input
          className="form-control"
          id="Skill"
          type="text"
          value={skill}
          placeholder="JavaScript"
          name="skill"
          onChange={handleInputChange}
        />
      </div>
      </Col>
      <Col  className="col-sm-3 align-self-center text-center float-right pr3">
      <div className="pull-right">
        <button id="sortButton"
          onClick={handleSortFormSubmit}
            type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Add to Filters
        </button>
      </div>
      </Col>
    
    </Row>
    </form>
  );
}

export default FormSort;