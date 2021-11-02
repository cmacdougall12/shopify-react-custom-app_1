// api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "mp-clone databse working!",
  });
});
// Import user controller
const userController = require("./userController");
// user routes
router.route("/users").get(userController.index).post(userController.new);

router
  .route("/users/:user_id")
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

//Import conversations controller
const conversationController = require("./converstionController");
router
  .route("/conversations")
  .get(conversationController.index)
  .post(conversationController.new);
router
  .route("/conversations/:conversation_id")
  .put(conversationController.update)
  .get(conversationController.view)
  .delete(userController.delete);

// Export API routes
module.exports = router;
