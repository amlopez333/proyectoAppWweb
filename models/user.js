const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const portfolioSchema = require('./portfolio');
const userSchema = new Schema({
    name: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    ssn: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    accountType: {type: String, required: true},
    accountNumber: {type: String, required: true},
    currentCashBalance: {type: Number, required: true},
    portfolio: [portfolioSchema]
});

module.exports = mongoose.model('users', userSchema);