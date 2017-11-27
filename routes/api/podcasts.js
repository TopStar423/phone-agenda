var express = require("express");
var router = express.Router();
var db = require("../../models/");


//get all users
router.get("/users", function (req, res) {
  db.users.findAll()
    .then(function (user) {
      res.json(user);
    });
});


// //get saved comments for specific podcast
router.get("/comments/:podcastInfo", function (req, res) {
  db.comments.findAll({
    where: {
      podcastInfo: req.params.podcastInfo
    }
  }).then(function (comments) {
    res.json(comments);
  })
});


// // post route to save save comment on current podcast episode page
router.post("/comment/save/", function (req, res) {
  db.comments.create(req.body, function (result) {
    console.log(result);
    // res.redirect("/");
  });
});

//get saved podcasts for logged in user
router.get("/savedPodcast/:userID", function (req, res) {
  db.SavedPodcast.findAll({
    where: {
      userID: req.params.userID
    }
  }).then(function (savedPodcast) {
    res.json(savedPodcast);
  })
});

// post route to save podcasts to logged in user's profile
router.post("/savedPodcast/save/", function (req, res) {
  db.SavedPodcast.create(req.body, function (result) {
    console.log(result);
    // res.redirect("/");
  });
});


module.exports = router;