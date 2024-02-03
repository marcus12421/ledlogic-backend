import mongoose from "mongoose";
import validator from "validator"; // to validate email address
import bcryptjs from "bcryptjs"; // to crypt password
import jwt from "jsonwebtoken"; // to generate jwt token
import crypto from "crypto"; // buildIn module already exist

const userModel = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter name"],
    maxLength: [30, "Name can not exceed 30 characters"],
    minLength: [4, "Name should have 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email Id"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password should be gtreater then 8 characters"],
    select: false,
  },
  avatar: {
    type: String,
  },
  companyName: {
    type: String,
  },
  notaBusiness: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  residential: {
    type: Boolean,
    default: false,
  },

  address: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    apptNo: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
    province: {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    country: {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  },
  socialLinks: {
    websiteUrl: {
      type: String,
    },
    websiteSupportUrl: {
      type: String,
    },
    fbUrl: {
      type: String,
    },
    igUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
  },

  // confirmCode: String,
  // confirmCodeExpire: String,

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// ** JWT TOKEN **
// generate a token and store it in cookies => can access the user logged in routes
userModel.methods.getJWTTOKEN = function () {
  // creating jwt token
  return jwt.sign({ id: this._id }, process.env.JWT_SEC_KEY, {
    expiresIn: process.env.JWT_KEY_EXPIRE,
  });
};

// for comparing register password with login password
userModel.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// ** IMPORTANT **
// Generating reset password token
userModel.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding to userShema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // adding password expire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userModel);
