var mongoose = require('mongoose');

var creditCardPaymentSchema = {
    cc:{
        type: String
    },
    amount:{
        type: String
    },
    cvc:{
        type: String
    },
    chname:{
        type: String
    },
    email:{
        type: String
    },
    contnum:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
}

var creditPayments = module.exports = mongoose.model('creditPayments', creditCardPaymentSchema);

//GET all Order Info
module.exports.getCreditPaymentData = function (callback, limit) {
    creditPayments.find(callback).limit(limit);
}

//Add an Order Information
module.exports.addCreditPaymentData = function (credit, callback) {
    creditPayments.create(credit, callback);
}