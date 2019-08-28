// import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
// import Card from "../components/Card";
// import Job from "../components/Job";
// import Footer from "../components/Footer";
// import API from "../utils/API";
// import { Col, Row, Container } from "../components/Grid";
// import { List } from "../components/List";

// class Saved extends Component {
//   state = {
//     jobs: []
//   };

//   componentDidMount() {
//     this.getSavedJobs();
//   }

//   getSavedJobs = () => {
//     API.getSavedJobs()
//       .then(res =>
//         this.setState({
//           jobs: res.data
//         })
//       )
//       .catch(err => console.log(err));
//   };

//   handleJobDelete = id => {
//     API.deleteJob(id).then(res => this.getSavedJobs());
//   };

//   render() {
//     return (
//       <Container>
//         <Row>
//           <Col size="md-12">
//             <Jumbotron>
//               <h1 className="text-center">
//                 <strong>(React) Google Jobs Search</strong>
//               </h1>
//               <h2 className="text-center">Search for and Save Jobs of Interest.</h2>
//             </Jumbotron>
//           </Col>
//         </Row>
//         <Row>
//           <Col size="md-12">
//             <Card title="Saved Jobs" icon="download">
//               {this.state.jobs.length ? (
//                 <List>
//                   {this.state.jobs.map(job => (
//                     <Job
//                       key={job._id}
//                       title={job.title}
//                       subtitle={job.subtitle}
//                       link={job.link}
//                       authors={job.authors.join(", ")}
//                       description={job.description}
//                       image={job.image}
//                       Button={() => (
//                         <button
//                           onClick={() => this.handleJobDelete(job._id)}
//                           className="btn btn-danger ml-2"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     />
//                   ))}
//                 </List>
//               ) : (
//                 <h2 className="text-center">No Saved Jobs</h2>
//               )}
//             </Card>
//           </Col>
//         </Row>
//         <Footer />
//       </Container>
//     );
//   }
// }

// export default Saved;
