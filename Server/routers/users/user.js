var express = require('express');
var router = express.Router();
var htmlspecialchars = require('htmlspecialchars');
require('../../models');
var User = require('../../models/users/user');

// create a new user called chris

router.get('/nearby/:id/page/:page', function (req, res) {
    var id = req.params.id;
    var page = Math.max(0, req.params.page - 1);
    var limit = 2;
    var toSkip = page*limit;
    User.getUsersNearby(id, limit, toSkip).then(result => {
        res.send(result);
    })
});

router.get('/', function (req, res) {
    User.getUsers().then(result => {
        res.send(result);
    })
});

router.post('/', function (req, res) {
    var body = req.body;
    var name = htmlspecialchars(body.name).trim();
    var lat = htmlspecialchars(body.lat);
    var lng = htmlspecialchars(body.lng);
    if (name.length > 0 && name.length <= 50 && /^[a-zA-Z]+$/.test(name)) {
        User.saveData(name, lat, lng).then(result => {
            res.send(result);
        }, err => {
            res.status(403).send(err);
        })
    } else {
        res.status(403).send("Name must contains only letters");
    }
});

router.put('/:id', function (req, res) {
    var body = req.body;
    var id = req.params.id;
    var name = htmlspecialchars(body.name).trim();
    var lat = htmlspecialchars(body.lat);
    var lng = htmlspecialchars(body.lng);
    if (name.length > 0 && name.length <= 50 && /^[a-zA-Z]+$/.test(name)) {
        User.updateData(id, name, lat, lng).then(result => {
            res.send(result);
        }, err => {
            res.status(403).send(err);
        })
    } else {
        res.status(403).send("Name must contains only letters");
    }
});

module.exports = router;