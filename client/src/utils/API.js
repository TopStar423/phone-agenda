import axios from "axios";

export default {
  search: function(searchTerm){
    return axios.get("/api/podcasts/search/" + searchTerm);
  }
};