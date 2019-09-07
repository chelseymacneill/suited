import React, { Component } from "react";
import "./style.css";
import { Row, Col, CustomInput, FormGroup, Label, Button, } from 'reactstrap';

// import sessions from "../../utils/sessions";

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
}

class Quiz extends Component {

  render() {

    return (
      <div className="quizContainer">
        <Row className="p-5">
          {result.map( (array, j) => (
            <Col md="2">
            {array.map( (top, i) => (
            <FormGroup >
            <Label for={array + j}>{top}</Label>              
              <div>
                <CustomInput type="radio" id={"y" + top[i] + i + j} name={"Radio" + j + i} label="+" onClick={ () => setArrays( top, "g" ) } />
                <CustomInput type="radio" id={"g" + top[i] + i + j} name={"Radio" + j + i} label="..." onClick={ () => setArrays( top, "y" ) } />
                <CustomInput type="radio" id={"r" + top[i] + i + j} name={"Radio" + j + i} label="-" onClick={ () => setArrays( top, "r" ) } />
              </div>
            </FormGroup>
            ))}
          </Col>
          ))}
          <FormGroup check row>
            <Col sm="12">
              <Button onClick={() => this.props.onClick(combo)}>Submit</Button>
            </Col>
          </FormGroup>
        </Row>
      </div>
    );
  }
}

export default Quiz;
