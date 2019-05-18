var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uid:{
        type: String
    },
    uname:{
        type: String
    },
    nic:{
        type: String
    },
    age:{
        type: String
    },
    phone:{
        type: String
    },
    govAgent:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});
var User = module.exports = mongoose.model('User', userSchema);

//GET all Train Info
module.exports.getuser = function (callback, limit) {
    User.find(callback).limit(limit);
}
//Add a Train Information
module.exports.addUser = function (user, callback) {
    User.create(user, callback);
}