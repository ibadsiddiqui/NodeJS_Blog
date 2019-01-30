const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

UserSchema.pre('save', (next) => {
    // targets the user being created before saving
    const user = this;

    bcrypt.hash(user.password, 10, (error, encryptedPassword) => {
        user.password = encryptedPassword;
    });

    next()
});

module.exports = mongoose.model("User", UserSchema);