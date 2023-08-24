const mongoose = require('mongoose');
str_collection = 'Ticket';

const ticketSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    TITLE: { type: String, required: true },
    DESCRIPTION: { type: String, required: true },
    INFORMATION: { type: String, required: false }, // User ไม่จำเป็นต้องให้ข้อมูลเพิ่เติมก็ได้
    CONTACT: { type: String, required: true },
    CREATE_TIME: { type: Date, required: true },
    UPDATE_TIME: { type: Date, required: true },
    USER_EMAIL: { type: String, required: true },
});
const TicketModel = mongoose.model(str_collection, ticketSchema);

//=========================== เพิ่ม validator ใน Schema===================================

ticketSchema.path('USER_EMAIL').validate(function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}, 'Invalid Email Format');

//=========================== เพิ่ม validator ใน Schema===================================

module.exports = TicketModel;
