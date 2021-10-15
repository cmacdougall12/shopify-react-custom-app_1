// userModel.js
var mongoose = require("mongoose");

// Setup schema
var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// Export user model
const User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
