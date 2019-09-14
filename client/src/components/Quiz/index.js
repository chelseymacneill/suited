import React, { Component } from "react";
import { Row, Col, CustomInput, FormGroup, Label, Button, } from 'reactstrap';
import { Link } from "react-router-dom";

// import sessions from "../../utils/sessions";

let top = [
  "Java",
  // "C",
  "Python",
  // "C++",
  // "C#",
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
  // "R",
  // "D",
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
  // "Data Structure",
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
      <div className="quizContainer px-5 py-3">
        <h2 className="CardHeader">Skills Quiz</h2>
        <p>Select <stong>+</stong> for skills that you are very confident in.</p>
        <p>Select <stong>:</stong> for intermediate level skills, or things you'd be willing to learn</p>
        <p>Select <stong>-</stong> for that you do not know and do not plan on learning</p>
        <p className="quizFootnote">You are <strong>not</strong> required to save an answer for every item, and can edit later</p>
        <Row className="">

          {result.map( (array, j) => (
            <Col md="2">
            {array.map( (top, i) => (
            <FormGroup >
            <Label className="quizLabel" for={array + j}>{top}</Label>              
              <div>
                <CustomInput type="radio" id={"y" + top[i] + i + j} name={"Radio" + j + i} label="+" onClick={ () => setArrays( top, "g" ) } />
                <CustomInput type="radio" id={"g" + top[i] + i + j} name={"Radio" + j + i} label=":" onClick={ () => setArrays( top, "y" ) } />
                <CustomInput type="radio" id={"r" + top[i] + i + j} name={"Radio" + j + i} label="-" onClick={ () => setArrays( top, "r" ) } />
              </div>
            </FormGroup>
            ))}
          </Col>
          ))}
          <FormGroup check row>
            <Col sm="12">
            <Link to="/search" id="quizLink"><Button id="quizButton" className="float-right" onClick={() => this.props.onClick(combo)}>Submit</Button></Link>
            </Col>
          </FormGroup>
        </Row>
      </div>
    );
  }
}

export default Quiz;
