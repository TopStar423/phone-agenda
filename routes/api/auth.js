// Requiring our models and passport as we've configured it
var express = require("express");
var router = express.Router();
var db = require("../../models");
var passport = require("../../config/passport");
const utils = require("../helpers");


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  router.post("/login", function(req, res, next) {
 
    passport.authenticate('local', function(err, user, info) {
      console.log(info)
      if (err) { return utils.respond(401, info, res) }
      if (!user) { return utils.respond(401, info, res) }
      req.logIn(user, function(err) {
        if (err) { return utils.respond(401, info, res) }
        return utils.respond(200, req.user, res);
      });

    })(req, res, next);
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  router.post("/signup", function(req, res) {
    console.log(req.body);
    db.users.create(req.body, function (result) {
      console.log(result);
      // res.redirect("/");
    }).then(function() {
      res.redirect(307, "/api/auth/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // Route for logging user out
  router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/api/users');
  });

  // Route for getting some data about our user to be used client side
  router.get("/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      utils.respond(401, null, res)
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      utils.respond(200, {
        email: req.user.email,
        id: req.user.id,
      }, res);
    }
  });

module.exports = router;