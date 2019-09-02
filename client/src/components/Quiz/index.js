import React, { Component } from "react";
//
import { RadioGroup, RadioButton } from "react-radio-buttons";
// This isn't being used below
import sessions from "../../utils/sessions";

const topLang = [
  "Java",
  "C",
  "Python",
  "C++",
  "C#",
  "Visual Basic",
  "Javascript",
  "PHP",
  "Objective-C",
  "SQL",
  "Ruby",
  "Ruby on Rails",
  "MATLAB",
  "Groovy",
  "Delphi/Object Pascal",
  "Assembly language",
  "Go",
  "Swift",
  "Perl",
  "R",
  "D",
  "SAS",
  "PL/SQL",
  "Dart",
  "F#",
  "Logo",
  "Rust",
  "Scratch",
  "Lua",
  "Transact-SQL",
  "COBOL",
  "Fortran",
  "Lisp",
  "TypeScript",
  "Scala",
  "Ada",
  "ActionScript",
  "Julia",
  "Scheme",
  "RPG",
  "Prolog",
  "PostScript",
  "VBScript",
  "Kotlin",
  "Awk",
  "Bash",
  "Haskell",
  "Powershell"
];
const buzz = [
  "Algorithms",
  "Algorithm",
  "Agile",
  "API",
  "REST API",
  "Bootstrap",
  "Materialize",
  "Responsive Design",
  "Adaptive Design",
  "Backend",
  "Frontend",
  "Debugging",
  "Debug",
  "Cache",
  "CSS",
  "HTML",
  "Data Structure",
  "Data Structures",
  "Heroku",
  "Git",
  "Github",
  "Github Pages",
  "Markdown",
  "ReadMe",
  "Framework",
  "Wireframe",
  "Full-Stack",
  "Full Stack",
  "HTTP",
  "JQuery",
  "Mobile Responsive",
  "MySQL",
  "Mongoose",
  "MongoDB",
  "PHP",
  "UI",
  "UX",
  "Version Control"
];
const jobTitles = [
  "Cybersecurity engineer",
  "AI/machine learning engineer",
  " Full stack developer",
  "Data scientist",
  "Python developer",
  "Java developer",
  "JavaScript developer",
  "Cloud engineer",
  "Scrum master",
  "DevOps engineer"
];

/* Old
class Quiz extends Component {
  render() {
    console.log(topLang);

    return (
      <div>
        <h1>Hello World: {this.props.userID}</h1>
        <p>{topLang}</p>
        <p>{buzz}</p>
        <p>{jobTitles}</p>
      </div>
    );
  }
}
*/

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    // What Sam needs passed to her
    this.state = {
      // Should pull this in from their username
      username: "Enter your name here is the default for now",
      JS: "n"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Hello {this.state.username}</h1>
        <p>Enter your name: </p>
        <input type="text" name="username" onChange={this.handleChange} />
        <br></br>
        <br></br>
        <p>
          We'd like to ask you some questions about your skills and interests to
          help you find you a job your're best SUITED for. Ready?
        </p>
        <br></br>
        <br></br>
        <p> Q1. Are you skilled in Javascript? </p>
        <input name="JS" onChange={this.handleChange} />
        <input type="radio" value="no" />
        No
        <input type="radio" value="yes" />
        Yes
        <br></br>
        <p> Q2. Are you skilled in Python? </p>
        <input name="JS" onChange={this.handleChange} />
        <input type="radio" value="no" />
        No
        <input type="radio" value="yes" />
        Yes
        <br></br>
        <p> Q3. Are you skilled in Java? </p>
        <input name="JS" onChange={this.handleChange} />
        <input type="radio" value="no" />
        No
        <input type="radio" value="yes" />
        Yes
        <br></br>
        <p> Q4. Are you skilled in C#? </p>
        <input name="JS" onChange={this.handleChange} />
        <input type="radio" value="no" />
        No
        <input type="radio" value="yes" />
        Yes
        <br></br>
        <input type="submit" value="Submit" />
        <br></br>
      </form>
    );
  }
}

export default Quiz;
