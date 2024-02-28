import express from "express";

import {
  login,
  logOut,
  register,
  forgotPassword,
  resetPassword,
  getUserDetaila,
  getAllUsers,
  loadUser,
  updateUserInfo,
} from "../controllers/userController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/Authentication.js";

const router = express.Router();

// register
router.post("/register", register);

console.log("third")
// login / logout
router.post("/login", login);
router.get("/logout", logOut);

// load User
router.get("/load-user", isAuthenticatedUser, loadUser);

// Update a User Details
router.patch("/update-user-info/:userId", updateUserInfo);

// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================

// forget Password / Reset Password
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Get user Details - ADMIN / LOGGEDIN USER
router.get("/user/:userId", isAuthenticatedUser, getUserDetaila);

// Get all the users
router.get("/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

export default router;
