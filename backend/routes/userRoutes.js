const express = require("express");

// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

// setup router
const router = express.Router();

// routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// export router
module.exports = router;
