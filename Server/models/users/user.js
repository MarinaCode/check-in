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
/**
 *
 * @param name user name for creation
 * @param lat latitude
 * @param lng longitude
 * @returns {*}
 */
User.saveData = function(name, lat, lng) {
    var deferred = defer();
    var user = new User({
        name: name,
        loc: [lat, lng]
    });

    user.save().then(result => {
        deferred.resolve(result);
    }, err => {
        deferred.reject(err);
    })
    return deferred.promise;
}
/**
 *
 * @param id user id which need to update
 * @param name user name
 * @param lat latitude
 * @param lng longitude
 * @returns {*}
 * findOneAndUpdate used for find and immediately update user data
 */
User.updateData = function(id, name, lat, lng) {
    var deferred = defer();
    var user = {
        name: name,
        loc: [lat, lng]
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
/**
 *
 * @returns {returns All users}
 */
User.getUsers = function() {
    var deferred = defer();
    User.find().then(result => {
        deferred.resolve(result);
    })
    return deferred.promise;
}
/**
 *
 * @param id user id
 * @param limit used for pagination
 * @param skip used for pagination
 * @returns {*}
 * $geoNear used for find users within 1km from current user's location.
 */
User.getUsersNearby = function(id, limit, skip) {
    var deferred = defer();
    User.find({
            _id: id

    }).then(data => {
        User.aggregate([
            {
                $geoNear: {
                    near: [data[0].loc[0], data[0].loc[1]],
                    spherical: true,
                    distanceField: "dis",
                    maxDistance : 1000/6378137,
                    distanceMultiplier: 6378137
                }
            },{ "$sort": { "dis": 1}}
        ]).then(count => {
            User.aggregate([
                {
                    $geoNear: {
                        near: [data[0].loc[0], data[0].loc[1]],
                        spherical: true,
                        distanceField: "dis",
                        maxDistance : 1000/6378137,
                        distanceMultiplier: 6378137
                    }
                },{ "$sort": { "dis": -1}},
                {$limit : limit + skip},
                {$skip : skip}
            ]).then(result => {
                deferred.resolve({
                    count: Math.ceil(count.length/2),
                    result: result
                })
            })
        })
    })
    return deferred.promise;
}
module.exports = User;