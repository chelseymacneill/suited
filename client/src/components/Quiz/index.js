import React, { Component } from "react";
import "./style.css";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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
          <Label for="exampleSelectMulti">Select languages you are interested in working with:</Label>
          <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
            <option>JavaScript</option>
            <option>Java</option>
            <option>Python</option>
            <option>C#</option>
            <option>Visual Basic</option>
          </Input>
        </FormGroup>
        
        <Button>Submit</Button>
      </Form>
    );
  }
}


export default Quiz;
