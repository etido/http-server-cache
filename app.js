var express = require('express');
var app = express();
var cache = require('memory-cache');
var app = express();
var GetBodyRequest = require('./api/helpers/getbodyrequest.js');
var SetupRequest = require('./api/helpers/setuprequest.js');
var serverConfig = null;
var start = process.hrtime();
var precision = 1; // 3 decimal places

//app.use(express.bodyParser());
process.on('uncaughtException', function (err) {
    console.log('uncaughtException ' + err);
});

app.configure(function () {
    app.use(function (req, res, next) {

        req.options = null;
        req.rawBodyRequest = null;
        req.elapsedtime = null;
        req.starttime = null;       
        next();
    });
    app.use(express.favicon(__dirname + '/favicon.ico'));   
    app.use(app.router);
});


app.post('*',[SetupRequest,GetBodyRequest], function (req, res) {
	var key = req.query["key"];
	var ttl = req.query["ttl"];	
	//console.log('key: '+key +' '+'ttl: '+ttl);
	cache.put(key, req.rawBodyRequest, ttl) // Time in ms  	
	var diff = process.hrtime(req.starttime);
	var elapsed = ((diff[0] * 1e9) + diff[1]) / 1000000;
	req.elapsedtime = elapsed.toFixed(precision);
	req.starttime = process.hrtime(); // reset the timer   
    res.end('{"Error": null,"HasError": false,"ElapsedTime": ' + '"' + req.elapsedtime + ' ms"}');
});
app.get('*',[SetupRequest], function (req, res) {
	var key = req.query["key"];
	//console.log('key: '+key);
	var response = cache.get(key); 	
	var diff = process.hrtime(req.starttime);
	var elapsed = ((diff[0] * 1e9) + diff[1]) / 1000000;
	req.elapsedtime = elapsed.toFixed(precision);
	req.starttime = process.hrtime(); // reset the timer   
	if (response!= undefined &&response!=null &&response !=''){
    res.end(response);
	}
	else
	{
    res.end('{"Error": null,"HasError": true,"ElapsedTime": ' + '"' + req.elapsedtime + ' ms"}');		
	}
});
var serverPort=process.env.VCAP_APP_PORT || 3000;
app.listen(serverPort);
console.log('Listening on port '+serverPort);