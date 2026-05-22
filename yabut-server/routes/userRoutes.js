const express = require("express");
// import functions
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router
  .route("/")
  .get(requireRole("admin"), getUsers)
  .post(requireRole("admin"), createUser);

router
  .route("/:id")
  .put(requireRole("admin"), updateUser)
  .delete(requireRole("admin"), deleteUser);

router.post("/login", loginUser);

module.exports = router;
