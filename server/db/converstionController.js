// conversationController.js
// Import conversation model
Conversation = require("./conversationModel");
// Handle index actions
exports.index = function (req, res) {
  Conversation.get(function (err, conversations) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Conversations retrieved successfully",
      data: users,
    });
  });
};
// Handle create user actions
exports.new = function (req, res) {
  const conversation = new Conversation();
  conversation.userId = req.body.userId
  conversation.productId = req.body.productId
  conversation.messages.push(req.body.message)
  // save the user and check for errors
  user.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New conversation created",
      data: conversation,
    });
  });
};
// Add message to conversation
exports.update = function (req, res) {
  Conversation.findById(req.params.user_id, req.params.product_id, function (err, conversation) {
    if (err) res.send(err);
    conversation.messages.push(req.body.message)
    // save the user and check for errors
    conversation.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Text added to conversation",
        data: conversation,
      });
    });
  });
};
// Handle delete user
// exports.delete = function (req, res) {
//   User.remove(
//     {
//       _id: req.params.user_id,
//     },
//     function (err, user) {
//       if (err) res.send(err);
//       res.json({
//         status: "success",
//         message: "user deleted",
//       });
//     }
//   );
// };
