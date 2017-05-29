var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/locations', function(err, db) {
    if(err) { return console.dir(err); }
});
