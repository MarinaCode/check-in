/**
 * Created by Marina Khanamiryan on 5/29/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defer = require("node-promise").defer;

const userSchema = new Schema({
    name: { type: String, required: true },
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
    },
    date: { type: Date,default: Date.now }

});

const User = mongoose.model('User', userSchema);

User.saveData = function(name, lat, lng) {
    var deferred = defer();
    var user = new User({
        name: name,
        loc: [lat,lng]
    });

    user.save().then(result => {
        deferred.resolve(result);
    }, err => {
        deferred.reject(err);
    })
    return deferred.promise;
}

User.updateData = function(id, name, lat, lng) {
    var deferred = defer();
    var user = {
        name: name,
        loc: [lat,lng]
    };

    User.findOneAndUpdate(
        {
            _id: id
        }, user
    ).then(result => {
        User.findOne({
            _id: id
        }).then(data => {
            deferred.resolve(data);
        })
    })

    return deferred.promise;
}
User.getUsers = function() {
    var deferred = defer();
    User.find().then(result => {
        deferred.resolve(result);
    })
    return deferred.promise;
}

module.exports = User;