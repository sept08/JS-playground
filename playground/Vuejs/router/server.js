var path = require('path');
var express = require('express');
var morgan = require('morgan'); // http request logger middleware for node.js

var app = express();
app.use(morgan()); // introduce middleware

app.use(function(req, res){ // introduce my middleware
    res.sendFile(path.join(__dirname, 'vue-router.html'));
})

app.listen(3000, function(err){
    if(err){
        console.error('express instance failed to listen, err:', err);
        return;
    }
    console.log('http running on 3000, open browser http://localhost:3000/');
})