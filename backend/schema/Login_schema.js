const mongoose = require('mongoose');
str_collection = 'Login';

const loginSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    USER_EMAIL: { type: String, required: true },
    PASSWORD: { type: String, required: true },
    ROLE: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
});

const LoginModel = mongoose.model(str_collection, loginSchema);

module.exports = LoginModel;
