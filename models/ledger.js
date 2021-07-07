const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ledgerSchema = new Schema ({
	date: { type: String},
    acctno: { type: String, required: true},
    acctname: { type: String, required: true},
    dr: { type: Number, default: 0},
    cr: { type: Number, default: 0},
    reference: { type: String}
});

module.exports = mongoose.model('Ledger',ledgerSchema);
