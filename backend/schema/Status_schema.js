const mongoose = require('mongoose');
str_collection = 'Status';

const StatusSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    STATSU_NAME: { type: String, required: true },
    CREATE_TIME: {type: Date, required: true},
    UPDATE_TIME: {type: Date, required: true},
});

const StatusModel = mongoose.model(str_collection, StatusSchema);

module.exports = StatusModel;
