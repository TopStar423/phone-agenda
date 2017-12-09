const express = require("express");
const router = express.Router();
const db = require("../../models/");
const passport = require("../../config/passport");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//get all users
router.get("/users", isAuthenticated, function (req, res) {
  db.users.findAll()
    .then(function (user) {
      res.json(user);
    });
});


// //get saved comments for specific podcast
router.get("/comments/:podcastName/:podcastEpisodeName", function (req, res) {
  db.comments.findAll({
    where: {
      podcastName: req.params.podcastName,
      podcastEpisodeName: req.params.podcastEpisodeName
    },
    order: [['createdAt', 'DESC']]
  }).then(function (comments) {
    res.json(comments);
  })
});

//get saved comments for all podcasts - to be used to retrieve comments for users subscribed podcasts
router.get("/comments/:podcastName", function (req, res) {
  db.comments.findAll({
    where: {
      podcastName: req.params.podcastName,
    },
    order: [['createdAt', 'DESC']]
  }).then(function (comments) {
    res.json(comments);
  })
});

//get saved podcasts for logged in user
router.get("/userComments/:userID", isAuthenticated, function (req, res) {
  db.comments.findAll({
    where: {
      userID: req.params.userID
    },
    order: [['createdAt', 'DESC']]
  }).then(function (comments) {
    res.json(comments);
  })
});

// // post route to save save comment on current podcast episode page
router.post("/comments/save", isAuthenticated, function (req, res) {
  db.comments.create(req.body, function (result) {
    console.log(result);
    // res.redirect("/");
  }).then(function() {
      res.json("Comment saved");
    }
  )
    .catch(function(err){
      res.json("Please enter a comment");
      console.log(err);
    });
});

//get saved podcasts for logged in user
router.get("/savedPodcast/:userID", isAuthenticated, function (req, res) {
  db.savedPodcasts.findAll({
    where: {
      userID: req.params.userID
    },
  }).then(function (savedPodcast) {
    res.json(savedPodcast);
  })
});

// post route to save podcasts to logged in user's profile
router.post("/savedPodcast/save/", isAuthenticated, function (req, res) {
  db.savedPodcasts.create(req.body, function(result){})
    .then(function() {
        res.json("Podcast saved.");
      }
    )
    .catch(function(){
     res.json("Podcast is already saved.");
    });
});

// post route to delete podcasts to logged in user's profile
router.delete("/savedPodcast/remove/:userId/:podcastName", function (req, res) {
  db.savedPodcasts.destroy({
    where: {
      userId: req.params.userId,
      podcastName: req.params.podcastName
    }
  })
    .then(function(res) {
        res.json("podcast deleted");
      }
    )
    .catch(function(err){
     res.json(err);
    });
});

module.exports = router;