import axios from "axios";
import { stringify } from "querystring";

export default {
  // Gets books from the Google API
  getJobs: function(q, l, s) {
    //return axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`);
    return axios.get(`/api/jobs?q=${q}&l=${l}&s=${s.join("-")}`);
  },
  // // Gets all saved books
  // getSavedBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Deletes the saved book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves an book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
  postSignup: function (data) {
    return axios.post("http://localhost:8001/api/users",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },
  postLogin: function (data) {
    return axios.post("http://localhost:8001/api/users/login",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },
  getCurrent: function () {
    return axios.get("/api/users/current")
  },
  jsonTest: function (data) {
    return axios.get("https://jsonplaceholder.typicode.com/posts",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
};
