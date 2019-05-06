var mongoose = require('mongoose');

//order Tickets Schema
var orderTicketsSchema = mongoose.Schema({
    trainId:{
      type: String,
      required: true
    },
    trainName:{
        type: String
    },
    numOfTickets:{
        type: String
    },
    totalPrice:{
        type: String
    },
    discountPrice:{
        type: String
    },
    userId:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var OrderTickets = module.exports = mongoose.model('OrderTickets', orderTicketsSchema);

//GET all Order Info
module.exports.getOrderTickets = function (callback, limit) {
    OrderTickets.find(callback).limit(limit);
}
//Get an Order information
module.exports.getOrderTicketById = function (id, callback) {//no need limit,because return 1
    OrderTickets.findById(id, callback);
}
//Add an Order Information
module.exports.addOrderTicketInfo = function (order, callback) {
    OrderTickets.create(order, callback);
}
//Update order Train info
module.exports.updateOrderTrainInfo = function (id, order, options, callback) {//genre is object -> data from form
    var query = {_id: id}; //the query
    var update = {
        trainId: order.trainId,
        trainName: order.trainName,
        numOfTickets: order.numOfTickets,
        totalPrice: order.totalPrice,
        discountPrice: order.discountPrice,
        userId: order.userId

    }//object
    OrderTickets.findOneAndUpdate(query, update, options, callback);
}
//Delete an order Info
module.exports.deleteOrderTrainInfo = function (id, callback) {//book is object -> data from form
    var query = {_id: id};
    OrderTickets.remove(query, callback);
}