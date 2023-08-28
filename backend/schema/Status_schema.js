const mongoose = require('mongoose');
str_collection = 'Status';

const StatusSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    STATUS_NAME: { type: String, required: true },
    STATUS_IMG: { type: String, required: true },
    CREATE_TIME: {type: Date, required: true},
    UPDATE_TIME: {type: Date, required: true},
}, { versionKey: false });

const StatusModel = mongoose.model(str_collection, StatusSchema);

module.exports = StatusModel;
