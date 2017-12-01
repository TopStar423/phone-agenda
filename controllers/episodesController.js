const app = require("express");
const axios = require("axios");
const Feed = require("rss-to-json");
const async = require("async");

module.exports = {
  findAll: function(req, res) {
    var searchTerm = req.params.id;
    var url = "https://itunes.apple.com/search?entity=podcast&term=" + searchTerm;

    async.waterfall([
        function(callback) {
          axios.get(url).then(function(res) {
            //console.log(res);
            return callback(null, res.data.results[0].feedUrl, res.data.results[0].artworkUrl100); // here
          });
        },

        function(feedUrl, artworkUrl, callback) {  // here
          Feed.load(feedUrl, function(err, rss) {
            //console.log(rss);
            if(err){
              console.log(err);
              return callback(err)
            }
            callback(null, artworkUrl, rss); // here
          });
        }

      ], function(err, artworkUrl, rss) {  // here
          if(err) {
            console.log(err)
          }
          else {
          //console.log(rss);
          res.json({  // in here
            rss: rss, 
            artworkUrl: artworkUrl
          });
         }
      });
    }
};