var mongoose = require('mongoose');

//Train Schema
var trainSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    depStation:{
        type: String
    },
    depTime:{
        type: String
    },
    ArrStation:{
        type: String
    },
    ArrTime:{
        type: String
    },
    frequency:{
        type: String
    },
    class:{
        type: String
    },
    ticketPrice:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Ticket = module.exports = mongoose.model('Ticket', trainSchema); //create model name as it is in the mongoose

//GET all Train Info
module.exports.getTrainInfo = function (callback, limit) {
    Ticket.find(callback).limit(limit);
}
//Get a Train information
module.exports.getTrainById = function (id, callback) {//no need limit,because return 1
    Ticket.findById(id, callback);
}
//Add a Train Information
module.exports.addTrain = function (train, callback) {
    Ticket.create(train, callback);
}
//Update Train info
module.exports.updateTrainInfo = function (id, train, options, callback) {//genre is object -> data from form
    var query = {_id: id}; //the query
    var update = {
        name: train.name,
        depStation: train.depStation,
        depTime: train.depTime,
        ArrStation: train.ArrStation,
        ArrTime: train.ArrTime,
        frequency: train.frequency,
        class: train.class,
        ticketPrice: train.ticketPrice

    }//object
    Ticket.findOneAndUpdate(query, update, options, callback);
}
//Delete a Train Info
module.exports.deleteTrainInfo = function (id, callback) {//book is object -> data from form
    var query = {_id: id};
    Ticket.remove(query, callback);
}