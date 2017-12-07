import axios from "axios";

export default {
  searchPodcasts: function (searchTerm) {
    return axios.get("https://itunes.apple.com/search?entity=podcast&term=" + searchTerm + "&limit=200");
  },

  searchEpisodes: function (searchTerm) {
    return axios.get("/api/episodes/search/" + searchTerm);
  },

  searchEpisode: function (pod_title, ep_title) {
    return axios.get("/api/episodes/search-one/" + pod_title + "/" + ep_title);
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
    return axios.get("/api/userComments/" + userId);
  }, 

  getUserPodcasts: function(userId){
    return axios.get("/api/savedPodcast/" + userId);
  },

  getUserData: function(){
    return axios.get("/api/auth/user_data");
  },

  getSavedPodcastComments: function(pod_name){
    return axios.get("/api/comments/" + pod_name);
  }
};