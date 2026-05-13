import exp from "express";
import { userModel } from "../Models/userModel.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const adminApp = exp.Router();


// ================= GET USERS =================
adminApp.get(
  "/users",
  verifyToken("ADMIN"),
  async (req, res) => {
    try {

      const users = await userModel.find(
        { role: "USER" }
      );

      res.status(200).json({
        message: "users",
        payload: users,
      });

    } catch (err) {

      res.status(500).json({
        message: "error",
        error: err.message,
      });
    }
  }
);


// ================= GET AUTHORS =================
adminApp.get(
  "/authors",
  verifyToken("ADMIN"),
  async (req, res) => {
    try {

      const authors = await userModel.find(
        { role: "AUTHOR" }
      );

      res.status(200).json({
        message: "authors",
        payload: authors,
      });

    } catch (err) {

      res.status(500).json({
        message: "error",
        error: err.message,
      });
    }
  }
);


// ================= BLOCK USER =================
adminApp.put(
  "/user/block/:id",
  verifyToken("ADMIN"),
  async (req, res) => {
    try {

      const updatedUser =
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              isUserActive: false,
            },
          },
          { new: true }
        );

      res.status(200).json({
        message: "user blocked",
        payload: updatedUser,
      });

    } catch (err) {

      res.status(500).json({
        message: "error",
        error: err.message,
      });
    }
  }
);


// ================= ACTIVATE USER =================
adminApp.put(
  "/user/activate/:id",
  verifyToken("ADMIN"),
  async (req, res) => {
    try {

      const updatedUser =
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              isUserActive: true,
            },
          },
          { new: true }
        );

      res.status(200).json({
        message: "user activated",
        payload: updatedUser,
      });

    } catch (err) {

      res.status(500).json({
        message: "error",
        error: err.message,
      });
    }
  }
);


// ================= BLOCK AUTHOR =================
adminApp.put(
  "/author/block/:id",
  verifyToken("ADMIN"),
  async (req, res) => {
    try {

      const updatedAuthor =
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              isUserActive: false,
            },
          },
          { new: true }
        );

      res.status(200).json({
        message: "author blocked",
        payload: updatedAuthor,
      });

    } catch (err) {

      res.status(500).json({
        message: "error",
        error: err.message,
      });
    }
  }
);


// ================= ACTIVATE AUTHOR =================
adminApp.put(
  "/author/activate/:id",
  verifyToken("ADMIN"),
  async (req, res) => {
    try {

      const updatedAuthor =
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              isUserActive: true,
            },
          },
          { new: true }
        );

      res.status(200).json({
        message: "author activated",
        payload: updatedAuthor,
      });

    } catch (err) {

      res.status(500).json({
        message: "error",
        error: err.message,
      });
    }
  }
);
