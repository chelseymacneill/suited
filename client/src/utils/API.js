import axios from "axios";

export default {
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
    return axios.get("http://localhost:8001/api/users/current")
  }
};
