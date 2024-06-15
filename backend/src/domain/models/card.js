const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    category: {
        type: String,
        enum: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'],
        required: true,
        default: 'FIRST', // Default value for category

    },
    lastReviewed: {
        type: Date,
        default: null,
    },
},
    { timestamps: true },
);

module.exports = mongoose.model('Card', cardSchema);
