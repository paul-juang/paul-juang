const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let lotoSchema = new Schema ({
    lotonum: { type: [String], required: true},
});

module.exports = mongoose.model('LotoLayout',lotoSchema);
