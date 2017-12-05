import axios from "axios";

export default {
  searchPodcasts: function (searchTerm) {
    return axios.get("https://itunes.apple.com/search?entity=podcast&term=" + searchTerm);
  },

  searchEpisodes: function (searchTerm) {
    return axios.get("/api/episodes/search/" + searchTerm);
  },

  searchEpisode: function (pod_title, ep_url) {
    return axios.get("/api/episodes/search-one/" + pod_title + "/" + ep_url);
  },

  login: function (userLoginData) {
    return axios.post("/api/auth/login", userLoginData);
  },

  signup: function (newUserData) {
    return axios.post("/api/auth/signup", newUserData);
  },

  logout: function () {
    return axios.get("/api/auth/logout");
  },

  saveComment: function(newComment){
    return axios.post("/api/comments/save", newComment);
  },

  savePodcast: function(newPodcast){
    return axios.post("/api/savedPodcast/save/", newPodcast);
  },

  getEpisodeComments: function(pod_name, pod_ep_name){
    return axios.get("/api/comments/" + pod_name + "/" + pod_ep_name);
  },

  getUserComments: function(userId){
    return axios.get("/api/comments/" + userId);
  }, 

  getUserPodcasts: function(userId){
    return axios.get("/api/savedPodcast/" + userId);
  },

  getUserData: function(){
    return axios.get("/api/auth/user_data");
  }
};