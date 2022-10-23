let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Movies = new Schema({
    name: {
        type: String
    },
    rating: {
        type: Number
    },
    cast: [],
    genre: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    addedBy: {
        type: Schema.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movies', Movies);




