import React from "react";
import "./style.css";



function Form({ q, l, handleInputChange, handleFormSubmit, redFilterTrue, updateDBTrue }) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Query">
          <strong>Job</strong>
        </label>
        <input
          className="form-control"
          id="Job"
          type="text"
          value={q}
          placeholder="Web Developer"
          name="q"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Location">
          <strong>Location</strong>
        </label>
        <input
          className="form-control"
          id="Location"
          type="text"
          value={l}
          placeholder="Seattle"
          name="l"
          onChange={handleInputChange}
        />
      </div>

      <div className="pull-right">
        <button id="formButton"
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Form;
