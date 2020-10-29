const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String
    }
})