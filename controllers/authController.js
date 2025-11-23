// new code 
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateTokens } from "../utils/generateTokens.js";
import sendEmailWithTemplate from "../utils/sendEmail.js";

// // =======================
// // Register User
// // =======================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* Helper → detect production frontend hostname */
const PROD_DOMAIN = "aroicon-checkin.vercel.app";

function cookieOptions(httpOnly = false) {
  return {
    httpOnly,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === "production" ? PROD_DOMAIN : undefined,
    path: "/",
  };
}

/* =======================
      LOGIN
=========================*/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "This email is not registered" });

    const match = await user.matchPassword(password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    const { accessToken, refreshToken } = generateTokens(user._id);

    // Do NOT store accessToken httpOnly
    res.cookie("accessToken", accessToken, cookieOptions(false));

    // Refresh token IS httpOnly
    res.cookie("refreshToken", refreshToken, cookieOptions(true));

    return res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* =======================
  REFRESH ACCESS TOKEN
=========================*/
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token found" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Update accessToken cookie
    res.cookie("accessToken", newAccessToken, cookieOptions(false));

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

/* =======================
      LOGOUT
=========================*/
export const logoutUser = (req, res) => {
  res.clearCookie("accessToken", cookieOptions(false));
  res.clearCookie("refreshToken", cookieOptions(true));
  res.json({ message: "Logged out successfully" });
};



// =======================
// Login User OLD Code
// =======================
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid email" });

//     const match = await user.matchPassword(password);
//     if (!match)
//       return res.status(400).json({ message: "Invalid password" });

//     const { accessToken, refreshToken } = generateTokens(user._id);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "none",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({
//       message: "Login successful",
//       accessToken,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// =======================
// Refresh Token
// =======================
// export const refreshAccessToken = async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token)
//       return res.status(401).json({ message: "No refresh token found" });

//     const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

//     const user = await User.findById(decoded.id);
//     if (!user)
//       return res.status(401).json({ message: "User not found" });

//     const { accessToken, refreshToken } = generateTokens(user._id);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "none",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({ accessToken });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid refresh token" });
//   }
// };

// =======================
// Logout User
// =======================
// export const logoutUser = (req, res) => {
//   res.clearCookie("refreshToken");
//   res.json({ message: "Logged out successfully" });
// };

// =======================
// Forgot Password
// =======================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // await sendEmailWithTemplate({
    //   to: user.email,
    //   name: user.name,
    //   templateKey: "RESET_TEMPLATE",
    //   mergeInfo: {
    //     name: user.name,
    //     reset_link: resetUrl,
    //   },
    // });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Reset Password
// =======================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token.trim())
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
