const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide your username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your email"]
    },
    password: {
        type: String,
        required: [true, "Please provide your password"]
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (user, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            user.password = hash;
            User.create(user, callback)
        });
    });
}