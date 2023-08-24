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
});

const UserModel = mongoose.model(str_collection, userSchema);

//=========================== เพิ่ม validator ใน Schema===================================

userSchema.path('USER_EMAIL').validate(function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, 'Invalid Email Format');
  
  userSchema.path('U_PHONE').validate(function (phone) {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  }, 'Invalid PhoneNumber Format');
  
  //=========================== เพิ่ม validator ใน Schema===================================

module.exports = UserModel;
