const express = require("express");
const cors = require("cors");

var server = express();
var port = process.env.PORT || 3000;

//Middleware
server.use(express.urlencoded({
    extended: false
}));
server.use(express.json());
server.use(cors());
var data = require("./data.js");

server.get("/user", function(req, res) {
    var response = {
        user: data.user,
    }
    res.json(response);
});

server.post("/user", function(req, res) {
    console.log(req.body.name);
    console.log(req.body.age);
    if (!req.body.name || !req.body.age) {
        res.status(400);
        var response = {
            msg: "Please enter a name and age"
        };
        res.json(response);
    } else {
        if (isNaN(req.body.age)) {
            res.status(400);
            var response = {
                msg: "Please enter a valid age"
            };
            res.json(response);
        } else {
            var new_user = {
                name: req.body.name,
                age: req.body.age,
                created_on: new Date()
            };
            data.user = new_user;
            res.status(201);
            res.send();
        }
    }
});

server.get("/greeting", function(req, res) {
    if (data.user.name == "") {
        var response = {
            greeting: "Welcome"
        };
    } else {
        var response = {
            greeting: `Welcome, ${data.user.name}`
        }
    }
    res.json(response);
});

server.listen(port, function() {
    console.log(`Listening on port ${port}`);
})