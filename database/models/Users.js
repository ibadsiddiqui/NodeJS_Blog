const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
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