var mongoose = require('mongoose');

var mobilePaymentSchema = {
    contnum:{
        type: String
    },
    pin:{
        type: String
    },
    amount:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
}

var mobilePayments = module.exports = mongoose.model('mobilePayments', mobilePaymentSchema);

//GET all Order Info
module.exports.getMobilePaymentData = function (callback, limit) {
    mobilePayments.find(callback).limit(limit);
}

//Add an Order Information
module.exports.addMobilePaymentData = function (mobile, callback) {
    mobilePayments.create(mobile, callback);
}