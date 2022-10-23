let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Users = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    accessToken: { type: String, trim: true, index: true, sparse: true, default: null },
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', Users);




