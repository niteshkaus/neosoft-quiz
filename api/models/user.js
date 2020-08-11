const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
     email: { type: String, required: true, unique: true },    
     marks: { type: Number, default: '0' }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);