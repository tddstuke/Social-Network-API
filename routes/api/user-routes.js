const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // addFriend,
  // removeFriend,
} = require("../../controllers/user-controller");

// set up get all and post at /api/users
router.route("/").get(getAllUsers).post(createUser);

// set up get one,put and delete at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// set up post friend and delete friend at /api/users/:userId/friends/:friendId
// router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
