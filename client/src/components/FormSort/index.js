import React from "react";
import {Row, Col} from 'reactstrap';
import "./style.css";

function FormSort({ skill, handleInputChange, handleSortFormSubmit }) {
  return (
    <form>
    <Row>
    <Col size="sm-10">
      <div className="form-group">
        <label htmlFor="Skill">
          <strong>Skill</strong>
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
      <Col size="sm-2">
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