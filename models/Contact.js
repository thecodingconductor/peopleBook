const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
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
        required: true
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
        required: true,
        default: true
    },
    notes: {
        type: String,
    }


})

module.exports = mongoose.model('contact', ContactSchema);