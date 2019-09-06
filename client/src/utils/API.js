import axios from "axios";
// import { stringify } from "querystring";

export default {
  // Gets books from the Google API
  getJobs: function(q, l, g, y, r) {
    return axios.get(`/api/jobs?q=${q}&l=${l}&g=${g.join("-")}&y=${y.join("-")}&r=${r.join("-")}`);
  },
  
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

  //////////////////favorite jobs//////////////////////
  postUserJob: function(data) {
    // return axios.get("/api/userJobs", 
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
    console.log("create Note: ", data);
    return axios.post("/api/jobs/createNote",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
};
