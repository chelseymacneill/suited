import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types"

//REDUX STUFF TO CONNECT COMPONENT WITH THE REDUCER/ACTION FILES
import { connect } from "react-redux";
import { fetchJSON } from "../../actions/authActions"


    //NO LONGER NEEDED B/C IT'S IN THE actions/signupAction.js

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: []
    //     }
    // }

    // componentDidMount() {
    //     fetch("https://jsonplaceholder.typicode.com/posts")
    //     .then(res => res.json())
    //     .then(data => this.setState({items: data}));
    // }
    ////////////////////////////////////////////////////
class Json extends Component {

    componentWillMount() {
        this.props.fetchJSON();
    }

    render() {
        // console.log(this.props);
    const jsonItems = this.props.posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    ));
    return (
        <div>
            <h1>Dummy JSON Data</h1>
            {/* use this as a template for job cards */}
            {jsonItems}
        </div>

    )};
};

Json.propTypes = {
    fetchJSON: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.basic.items
})

//mapping component to property
export default connect(mapStateToProps, { fetchJSON })(Json);
// export default connect(null, { fetchJSON })(Json);

