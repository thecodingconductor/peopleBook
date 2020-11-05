const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    lastContacted: {
        type: Date,

    },
    needToContact: {
        type: Boolean,
        default: true
    },
    notes: {
        type: String,
    }


})

module.exports = mongoose.model('person', PersonSchema);