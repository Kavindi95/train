var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Ticket = require('./models/trainInfo');

//connect to Mongoose
mongoose.connect('mongodb://localhost/trainticket');
var db = mongoose.connection;

/*
* Load the application
* */
app.get('/', function (req,res) {
    res.send('hello');
});

/*
* Train Information handling API
* */
app.get('/api/trainInfo', function (req, res) {
    Ticket.getTrainInfo(function (err, trainInfo) {
        if(err){
            throw err;
        }
        res.json(trainInfo);
    });
});

app.get('/api/trainInfo/:_id', function (req, res) {//:id means what ever id passed into it
    Ticket.getTrainById(req.params._id,function (err, trainInfo) {
        if (err){
            throw err;
        }
        res.json(trainInfo);
    });
});

app.post('/api/trainInfo', function (req, res) {
    var train = req.body; //save everything in form into genre object
    Ticket.addTrain(train, function (err, train) {
        if (err){
            throw err;
        }
        res.json(train);
    });
});

app.put('/api/trainInfo/:_id', function (req, res) {
    var id = req.params._id;
    var train = req.body; //save everything in form into genre object
    Ticket.updateTrainInfo(id, train, {},function (err, train) {
        if (err){
            throw err;
        }
        res.json(train);
    });
});

app.delete('/api/trainInfo/:_id', function (req, res) {
    var id = req.params._id;
    Ticket.deleteTrainInfo(id,function (err, train) {
        if (err){
            throw err;
        }
        res.json(train);
    });
});

app.listen(3000);
console.log('Running on port 3000....');