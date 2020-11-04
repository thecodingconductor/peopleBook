const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users'
    // },
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

module.exports = mongoose.model('organization', OrganizationSchema);