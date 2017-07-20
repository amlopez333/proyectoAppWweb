const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const portfolioSchema = new Schema({
        _id: {type: Schema.Types.ObjectId, required: true},
        ticker: String,
        name: String,
        price: Number,
        dateBought: {type: Date, default: Date.now},
        amount: Number
});
module.exports = portfolioSchema;