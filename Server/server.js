/**
 * Created by Marina Khanamiryan on 5/29/2017.
 */
 var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    router = require('./routers'),
    morgan = require('morgan'),
    app = express();

app.use(morgan('dev'));
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000 }));

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:4200'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    next();
});

router(app);

http.createServer(app).listen(config.port, function(){
    console.log(`Listening port ${config.port}`);
})
