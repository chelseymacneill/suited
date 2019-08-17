import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";

class Search extends Component {
    // state = {
    //     book: {}
    // };
    // When this component mounts, grab the book with the _id of this.props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    // componentDidMount() {
    //     API.getBook(this.props.match.params.id)
    //         .then(res => this.setState({ book: res.data }))
    //         .catch(err => console.log(err));
    // }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                Hello World: Search Bar Here
                            </h1>
                            <input className="form-control" type="text" placeholder="Default input"></input>

                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        {/* insert search filter component */}
                        <h2>Search Filter goes here</h2>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        {/* insert job container and job card components */}
                        <h2>Job Cards live here - from Job DB Collection</h2>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        {/* insert footer component */}
                        <h2>Footer Down at the bottom</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;