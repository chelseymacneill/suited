import React from "react";

function FormSort({ skill, handleInputChange, handleSortFormSubmit }) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Skill">
          <strong>Skill</strong>
        </label>
        <input
          className="form-control"
          id="Skill"
          type="text"
          value={skill}
          placeholder="Skill"
          name="skill"
          onChange={handleInputChange}
        />
      </div>
      
      <div className="pull-right">
        <button
          onClick={handleSortFormSubmit}
            type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Add to Filters
        </button>
      </div>
    </form>
  );
}

export default FormSort;