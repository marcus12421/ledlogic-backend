import jwt from "jsonwebtoken";

import ErrorHandler from "../utils/ErrorHandler.js";
import CatchAsyncError from "./CatchAsyncError.js";
import User from "../models/UserModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SEC_KEY);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    res.status(401).json({
      success: false,
      error: err.message,
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce`,
          403
        )
      );
    }

    next();
  };
};
