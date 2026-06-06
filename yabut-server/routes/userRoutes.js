const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

// PUBLIC routes (no auth required)
router.post("/signup", createUser);
router.post("/login", loginUser);

// ADMIN-only routes
router
  .route("/")
  .get(requireRole("admin"), getUsers)
  .post(requireRole("admin"), createUser);

router
  .route("/:id")
  .put(requireRole("admin"), updateUser)
  .delete(requireRole("admin"), deleteUser);

module.exports = router;