/**
 * Created by Marina Khanamiryan on 5/29/2017.
 */

var express = require('express');
var router = express.Router();
var routerApi = express.Router();
var _ = require('lodash-node');
var config = require('../config/config.js');


var router_config = [
    {
        path:'./users/user.js',
        name: '/user'
    }
]
module.exports = function(app) {
    app.use("",router);
    router.use(config.restApi.rest_url(),routerApi);
    use(routerApi)
};

function  use(routerApi) {
    _.each(router_config,(route) => {
        var newRouter = require(route.path);
        routerApi.use(route.name, newRouter);
    })
}