const mongoose = require('mongoose');
str_collection = 'Ticket';

const ticketSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    TITEL: {type: String, required: true},
    DESCRIPTION:{type: String, required: true},
    INFORMATION: {type: String, required: true},
    CONTACT: {type: String, required: true},
    CREATE_TIME: {type: Timestamp, required: true},
    UPDATE_TIME: {type: Timestamp, required: true},
    USER_EMAIL: { type: String, required: true },
});

const TicketModel = mongoose.model(str_collection, ticketSchema);

module.exports = TicketModel;
