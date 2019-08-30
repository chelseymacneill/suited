import React, { Component } from "react";
import sessions from "../../utils/sessions"

const topLang = [ "Java", "C", "Python", "C++", "C#", "Visual Basic", "Javascript", "PHP", "Objective-C", "SQL", "Ruby", "Ruby on Rails", "MATLAB", 
"Groovy", "Delphi/Object Pascal", "Assembly language", "Go", "Swift", "Perl", "R", "D", "SAS", "PL/SQL", "Dart", "F#", "Logo", "Rust", "Scratch", "Lua",
"Transact-SQL", "COBOL", "Fortran", "Lisp", "TypeScript", "Scala", "Ada", "ActionScript", "Julia", "Scheme", "RPG", "Prolog", "PostScript",
"VBScript", "Kotlin", "Awk", "Bash", "Haskell", "Powershell" ];
const buzz = [ "Algorithms", "Algorithm", "Agile", "API", "REST API", "Bootstrap", "Materialize", "Responsive Design", "Adaptive Design", 
"Backend", "Frontend", "Debugging", "Debug", "Cache", "CSS", "HTML", "Data Structure", "Data Structures", "Heroku", "Git", "Github", 
"Github Pages", "Markdown", "ReadMe", "Framework", "Wireframe", "Full-Stack", "Full Stack", "HTTP", "JQuery", "Mobile Responsive", "MySQL",
"Mongoose", "MongoDB", "PHP", "UI", "UX", "Version Control" ];
const jobTitles = [ "Cybersecurity engineer", "AI/machine learning engineer", " Full stack developer", "Data scientist", "Python developer",
"Java developer", "JavaScript developer", "Cloud engineer", "Scrum master", "DevOps engineer" ]

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
    )}
}

export default Quiz;



