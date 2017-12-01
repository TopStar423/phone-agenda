import axios from "axios";

export default {
    searchPodcasts: function(searchTerm) {
        // find all podcasts associated with given search term
        return axios.get("https://itunes.apple.com/search?entity=podcast&term=" + searchTerm);
    },

    searchEpisodes: function(searchTerm) {
        // find all episodes of a given podcast name
        return axios.get("/api/episodes/search/" + searchTerm);
    },

    login: function(userLoginData) {
    	return axios.post("/api/auth/login", userLoginData)
    }
};