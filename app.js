var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Ticket = require('./models/trainInfo');
OrderTickets = require('./models/orderTickets');
User = require('./models/user');

//connect to Mongoose
mongoose.connect('mongodb://localhost/trainticket');
var db = mongoose.connection;

/*
* Load the application
* */
app.get('/', function (req,res) {
    res.send('hello world');
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

/*
* Oder Tickets Information handling API
* */
app.get('/api/orderTickets', function (req, res) {
    OrderTickets.getOrderTickets(function (err, orderTickets) {
        if(err){
            throw err;
        }
        res.json(orderTickets);
    });
});

app.get('/api/orderTickets/:_id', function (req, res) {//:id means what ever id passed into it
    OrderTickets.getOrderTicketById(req.params._id,function (err, orderTickets) {
        if (err){
            throw err;
        }
        res.json(orderTickets);
    });
});


app.post('/api/orderTickets', function (req, res) {
    var order = req.body; //save everything in form into genre object
    OrderTickets.addOrderTicketInfo(order, function (err, order) {
        if (err){
            throw err;
        }
        res.json(order);
    });
});

app.put('/api/orderTickets/:_id', function (req, res) {
    var id = req.params._id;
    var order = req.body; //save everything in form into genre object
    OrderTickets.updateOrderTrainInfo(id, order, {},function (err, order) {
        if (err){
            throw err;
        }
        res.json(order);
    });
});

app.delete('/api/orderTickets/:_id', function (req, res) {
    var id = req.params._id;
    OrderTickets.deleteOrderTrainInfo(id,function (err, order) {
        if (err){
            throw err;
        }
        res.json(order);
    });
});

/*
* Oder Tickets Information handling API
* */
app.get('/api/user', function (req, res) {
    User.getuser(function (err, user) {
        if(err){
            throw err;
        }
        res.json(user);
    });
});

app.post('/api/user', function (req, res) {
    var user = req.body; //save everything in form into genre object
    User.addUser(user, function (err, user) {
        if (err){
            throw err;
        }
        res.json(user);
    });
});


app.listen(5000);
console.log('Running on port 5000....');

























