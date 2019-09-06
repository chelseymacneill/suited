import axios from "axios";
// import { stringify } from "querystring";

export default {
  // Gets books from the Google API
  getJobs: function(q, l, g, y, r) {
    //return axios.get(`https://indreed.herokuapp.com/api/jobs?q=${q}&l=${l}`);
    return axios.get(`/api/jobs?q=${q}&l=${l}&g=${g.join("-")}&y=${y.join("-")}&r=${r.join("-")}`);
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
    return axios.post("/api/users",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },
  postLogin: function (data) {
    return axios.post("/api/users/login",
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
  //////////////////user quiz results//////////////////////
  postQuiz: function (data) {
    return axios.post("/api/users/quiz",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  //////////////////favorite jobs//////////////////////
  postUserJob: function(data) {
    console.log("POST USER JOB", data)
    return axios.post("/api/jobs/favorite", 
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  getFavorites: function(data) {
    // console.log("GET FAVORITES: ", data);
    return axios.post("/api/jobs/getFavorites",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  removeFavorite: function(data) {
        console.log("GET FAVORITES: ", data);

    return axios.post("/api/jobs/removeFavorite",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  updateFavorite: function(data) {
    console.log("move FAVORITE: ", data);

    return axios.post("/api/jobs/updateTracked",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  createNote: function(data) {
    console.log("CREATE NOTE API: ", data);
    return axios.post("/api/jobs/createNote",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  },

  deleteNote: function(data) {
    console.log("DELETE NOTE API: ", data);
    return axios.post("/api/jobs/deleteNote",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
};
