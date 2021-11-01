// userController.js
// Import user model
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
      data: conversations,
    });
  });
};
// Handle create conversation actions
exports.new = function (req, res) {
  const conversation = new Conversation();
  conversation.userId = req.body.userId ? req.body.userId : conversation.userId;
  conversation.productId = req.body.productId;
  conversation.messages.push({
    text: req.body.text,
    receipients: req.body.receipients,
  });
  // save the user and check for errors
  conversation.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New conversation created!",
      data: conversation,
    });
  });
};

// Handle view user info
exports.view = function (req, res) {
  Conversation.findById(
    req.params.conversation_id,
    function (err, conversation) {
      if (err) res.send(err);
      res.json({
        message: "conversation details loading..",
        data: conversation,
      });
    }
  );
};
// Handle add message to existing conversation
exports.update = function (req, res) {
  Conversation.findById(
    req.params.conversation_id,
    function (err, conversation) {
      if (err) res.send(err);
      conversation.messages.push({
        text: req.body.text,
        receipients: req.body.receipients,
      });
      // save the user and check for errors
      conversation.save(function (err) {
        if (err) res.json(err);
        res.json({
          message: "Message added to conversation",
          data: conversation,
        });
      });
    }
  );
};
// Handle delete conversation
exports.delete = function (req, res) {
  Conversation.remove(
    {
      _id: req.params.conversation_id,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "conversation deleted",
      });
    }
  );
};
