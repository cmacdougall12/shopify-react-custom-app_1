// userModel.js
var mongoose = require("mongoose");

// Setup schema
var conversationSchema = mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  messages: [
    {
      text: String,
      receipents: [Number],
    },
  ],
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// Export conversation model
const Conversation = (module.exports = mongoose.model(
  "conversation",
  conversationSchema
));
module.exports.get = function (callback, limit) {
  Conversation.find(callback).limit(limit);
};
