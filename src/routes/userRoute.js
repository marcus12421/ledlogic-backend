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
} from "../controllers/userController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/Authentication.js";

const router = express.Router();

// register
router.post("/register", register);

// login / logout
router.post("/login", login);
router.get("/logout", logOut);

// load User
router.get("/load-user", isAuthenticatedUser, loadUser);

// forget Password / Reset Password
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Get user Details - ADMIN / LOGGEDIN USER
router.get("/user/:userId", isAuthenticatedUser, getUserDetaila);

// Get all the users
router.get("/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Update a User Details
router.post("/user/:userId", isAuthenticatedUser, getAllUsers);

export default router;
