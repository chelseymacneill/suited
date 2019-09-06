import React, { Component } from "react";
import "./style.css";
import { Row, Col, CustomInput, Form, FormGroup, Label, Button, ButtonGroup } from 'reactstrap';

import sessions from "../../utils/sessions";

let top = [
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
  "Powershell",
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
top = top.sort();

let g = [];
let y = [];
let r = [];

let combo = [];

function chunkArray(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}
var result = chunkArray(top, 5);

function setArrays(skill, array) {
    combo.push({ "skill": skill, "radio": array })
        for (let i = 0; i < combo.length - 1; i++) {
          if (skill === combo[i].skill) {
            combo.splice(i, 1); 
            i--;
          }
        }
        console.log(combo);
}

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


// function Quiz({onClick, rState}) {
class Quiz extends Component {
  // rState = rState;

  // componentDidMount () {
  //   console.log(this.props.rState)

  // }
  render(props) {

    return (
      <div className="quizContainer">
        {/* <p>{topLang}</p> */}
        <Row>
          {result.map( (array, j) => (
            <Col md="2">
            {array.map( (top, i) => (
            //   <FormGroup>
            //   <Label for="exampleCustomRange">{top}</Label>
            //   <CustomInput type="range" id="exampleCustomRange" name="customRange" />
            // </FormGroup>
            /////////////////////////////////////////////
            // onChangeCapture={ () => console.log({top, j, i})}
            <FormGroup >
            <Label for={array + j}>{top}</Label>              
          <div>
            <CustomInput type="radio" id={"y" + top[i] + i + j} name={"Radio" + j + i} label="+" onClick={ () => setArrays( top, "g" ) } />
            <CustomInput type="radio" id={"g" + top[i] + i + j} name={"Radio" + j + i} label="..." onClick={ () => setArrays( top, "y" ) } />
            <CustomInput type="radio" id={"r" + top[i] + i + j} name={"Radio" + j + i} label="-" onClick={ () => setArrays( top, "r" ) } />
              </div>
            </FormGroup>
            
          ////////////////////////////////////////////////
        //   <FormGroup tag="fieldset">
        //   <legend>Radio Buttons</legend>
        //   <FormGroup check>
        //     <Label check>
        //       <Input type="radio" name="radio1" />{' '}
        //       Option one is this and that—be sure to include why it's great
        //     </Label>
        //   </FormGroup>
        //   <FormGroup check>
        //     <Label check>
        //       <Input type="radio" name="radio1" />{' '}
        //       Option two can be something else and selecting it will deselect option one
        //     </Label>
        //   </FormGroup>
        //   <FormGroup check disabled>
        //     <Label check>
        //       <Input type="radio" name="radio1" disabled />{' '}
        //       Option three is disabled
        //     </Label>
        //   </FormGroup>
        // </FormGroup>
          /////////////////////////////////////////////////
        //   <div>
        //   <h5>{top}</h5>
        // <ButtonGroup>
        //   <Button color="primary" onClick={() => onClick(1)} active={rState[i] === 1}>One</Button>
        //   <Button color="primary" onClick={() => onClick(2)} active={rState[i] === 2}>Two</Button>
        //   <Button color="primary" onClick={() => onClick(3)} active={rState[i] === 3}>Three</Button>
        // </ButtonGroup>
        // {/* <p>Selected: {rState[i]}</p> */}
        // </div>
            ))}
          </Col>
          ))}
          <FormGroup check row>
            <Col sm="12">
              {/* <Button onClick={()=>console.log(combo)}>Submit</Button> */}
              <Button onClick={() => this.props.onClick(combo)}>Submit</Button>

            </Col>
          </FormGroup>
        </Row>
      </div>
    );
  }
}



// class Quiz extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // Capture the name of the user via the user typing it in or by inheriting it from their profile
//       username: "username",
//       javaScriptSkill: false,
//       pythonSkill: false,
//       javaSkill: false,
//       cSharpSkill: false,
//       sqlSkill: false
//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }

//   handleSubmit(event) {
//     alert("A name was submitted: " + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//     );
//   }
// }

export default Quiz;
