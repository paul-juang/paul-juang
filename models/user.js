const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema ({
	name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

module.exports = mongoose.model('User',userSchema);
