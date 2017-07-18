const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buySchema = new Schema({
    ssn: {type: String, required: true},
    ticker: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    amount: {type: Number, required: true},
});

module.exports = mongoose.model('buys', buySchema);