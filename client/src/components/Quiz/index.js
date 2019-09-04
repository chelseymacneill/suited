import React, { Component } from "react";
import "./style.css";

import { CustomInput, Form, FormGroup, Label } from 'reactstrap';

// Multiple Inputs
class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Capture the name of the user via the user typing it in or by inheriting it from their profile
      username: "username", // This should be the unique userid or sessionid whatever we are using to identify a user
      skillInterests: [],
      skillDisinterest: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }


    render() {
      return (
        <Form>
          <FormGroup>
            <Label for="exampleCheckbox">Select skills that you are interested in: </Label>
            <div>
              <CustomInput type="checkbox" id="int-JS" label="JavaScript" inline />
              <CustomInput type="checkbox" id="int-CSS" label="CSS" inline />
              <CustomInput type="checkbox" id="int-HTML" label="HTML" inline />
              <CustomInput type="checkbox" id="int-Python" label="Python" inline />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Select skills that you are NOT interested in: </Label>
            <div>
            <CustomInput type="checkbox" id="not-JS" label="JavaScript" inline />
              <CustomInput type="checkbox" id="not-CSS" label="CSS" inline />
              <CustomInput type="checkbox" id="not-HTML" label="HTML" inline />
              <CustomInput type="checkbox" id="not-Python" label="Python" inline />
            </div>
          </FormGroup>

</Form>
      );
    }
  }

export default Quiz;
