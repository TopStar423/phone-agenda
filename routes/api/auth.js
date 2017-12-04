// Requiring our models and passport as we've configured it
var express = require("express");
var router = express.Router();
var db = require("../../models");
var passport = require("../../config/passport");
const utils = require("../helpers");


//log in route
router.post("/login", function(req, res, next) {
    //using passport's built in authenticate function, local strategy, and custom callback
    passport.authenticate('local', function(err, user, info) {
        if (err) { return utils.respond(401, info.message, null, res) }
        if (!user) { return utils.respond(401, info.message, null, res) }
        //logs the user in using passport's login function, callback function = "done" from local strategy
        req.logIn(user, function(err) {
            if (err) { return utils.respond(401, info.message, res) }
            return utils.respond(200, info.message, req.user, res);
        });
    })(req, res, next);
});

//signup route
router.post("/signup", function(req, res) {
    //create the user
    db.users.create(req.body, function(result) {}).then(function() {
        res.redirect(307, "/api/auth/login");
    }).catch(function(err) {
        let sequelizeErrors = {
            "username": "",
            "email": "",
            "password": ""
        };
        for (var i = 0; i < err.errors.length; i++) {
            if (err.errors[i].type === "unique violation") {
                switch (err.errors[i].path) {
                    case "username":
                        sequelizeErrors.username = "Username is already taken";
                        break;
                    case "email":
                        sequelizeErrors.email = "Email is already in use";
                        break;
                }
              }
                else if (err.errors[i].type === "Validation error") {
                    switch (err.errors[i].path) {
                        case "username":
                            sequelizeErrors.username = "Username must be at least 6 characters";
                            break;
                        case "password":
                            sequelizeErrors.password = "Password must be at least 8 characters";
                            break;
                        case "email":
                            sequelizeErrors.email = "Please enter a valid email";
                            break;                        
                    }
                }
            }
        res.json(sequelizeErrors);
    });

});
// Route for logging user out
router.get('/logout', function(req, res) {
    console.log('logging out');
    req.logout();
    res.redirect('/api/users');
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        utils.respond(401, null, null, res)
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        utils.respond(200, null, {
            username: req.user.username,
            id: req.user.id,
        }, res);
    }
});

module.exports = router;