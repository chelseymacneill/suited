import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { Col, Row, Container} from "../components/Grid";
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

    state = {
        jobs: [],
        q: "",
        l: "",
        message: "Enter in your desired Job to begin!"
      };

    //   getBooks = () => {
    //     API.getBooks(this.state.q, this.state.l)
    //       .then(res =>
    //         this.setState({
    //           jobs: res.data
    //         })
    //       )
    //       .catch(() =>
    //         this.setState({
    //           books: [],
    //           jobs: "No New Books Found, Try a Different Query"
    //         })
    //       );
    //   };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks();
      };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                Hello World: Search Bar Here
                            </h1>
                            {/* <input className="form-control" type="text" placeholder="Default input"></input> */}
                            <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                l={this.state.l}
              />

                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                <h2 className="text-center">{this.state.message}</h2>
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