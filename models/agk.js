const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let agkSchema = new Schema ({
    acctno: { type: String, required: true},
    acctname: { type: String, required: true},
    dr: { type: Number, default: 0},
    cr: { type: Number, default: 0},
    date: { type: String}
});

module.exports = mongoose.model('Agk',agkSchema);
