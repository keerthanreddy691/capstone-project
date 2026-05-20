import exp from "express";
import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken.js";

const { sign } = jwt;

export const commonApp = exp.Router();


// ================= REGISTER =================
commonApp.post("/users", async (req, res) => {
  try {
    const allowedRoles = ["USER", "AUTHOR", "ADMIN"];
    const newUser = req.body;

    // check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "invalid role" });
    }

    // check existing user
    const existingUser = await userModel.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    newUser.password = await bcrypt.hash(newUser.password, 12);

    const newUserDoc = new userModel(newUser);
    await newUserDoc.save();

    res.status(201).json({ message: "user created" });
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      error: err.message,
    });
  }
});


// ================= LOGIN =================
commonApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "invalid password" }); // ✅ FIXED
    }

    const signedToken = sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

   res.cookie("token", signedToken, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 60 * 60 * 1000, // 1 hour
});

    res.status(200).json({
      message: "login success",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      error: err.message,
    });
  }
});


// ================= LOGOUT =================
commonApp.get("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({
    message: "logout success",
  });
});


// ================= CHECK AUTH =================
commonApp.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res) => {
    try {
      let user;

      if (req.user.role === "USER") {
        user = await userModel
          .findById(req.user.id)
          .select("-password");
      }

      if (req.user.role === "AUTHOR") {
        user = await authorModel
          .findById(req.user.id)
          .select("-password");
      }

      if (req.user.role === "ADMIN") {
        user = await adminModel
          .findById(req.user.id)
          .select("-password");
      }

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User authenticated",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        message: "error occurred",
        error: err.message,
      });
    }
  }
);


// ================= CHANGE PASSWORD =================
// ================= CHECK AUTH =================
// ================= CHECK AUTH =================
commonApp.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res) => {
    try {
      const user = await userModel
        .findById(req.user.id)
        .select("-password");

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      console.log("CHECK AUTH USER:", {
        id: user._id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        message: "User authenticated",
        payload: user,
      });
    } catch (err) {
      console.log("CHECK AUTH ERROR:", err);

      res.status(500).json({
        message: "error occurred",
        error: err.message,
      });
    }
  }
);
