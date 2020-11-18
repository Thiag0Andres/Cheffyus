import axios from "axios";

const api = axios.create({
  /*   baseURL: "https://cheffyus-api.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
  }, */
  baseURL: "https://localhost:9000/",
});

export default api;
