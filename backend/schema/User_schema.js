const mongoose = require('mongoose');
str_collection = 'User';

const userSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    U_NAME: { type: String, required: true },
    U_SURNAME: { type: String, required: true },
    U_PHONE: { type: String, required: true },
    USER_EMAIL: { type: String, required: true },
    U_IMG: { type: String},
    U_REGISTER: {type: Date, required: true},
}, { versionKey: false });

const UserModel = mongoose.model(str_collection, userSchema);

module.exports = UserModel;
