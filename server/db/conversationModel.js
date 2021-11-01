// conversationModel.js
var mongoose = require("mongoose");

// Setup schema
var conversationSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  messages: { type: Array, default: [] },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// Export user model
const Conversation = (module.exports = mongoose.model("conversation", conversationSchema));
module.exports.get = function (callback, limit) {
  Conversation.find(callback).limit(limit);
};
