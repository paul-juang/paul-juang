const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let treeSchema = new Schema ({
    name: { type: String, required: true},
    parent: { type: String, required: true},
    idx: { type: String, default: ""},
    date: { type: String}

});

module.exports = mongoose.model('TreeLayout',treeSchema);
