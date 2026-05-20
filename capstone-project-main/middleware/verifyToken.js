import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

console.log("NEW VERIFY TOKEN FILE LOADED");

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      console.log("Cookies:", req.cookies);

      // Get token from cookie
      const token = req.cookies?.token;

      console.log("Token exists:", !!token);

      if (!token) {
        return res.status(401).json({
          message: "please login first",
        });
      }

      // Verify JWT
      const decodedToken = jwt.verify(
        token,
        process.env.SECRET_KEY
      );

      console.log("Decoded Token:", decodedToken);

      // Check role authorization
      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "you are not authorized",
        });
      }

      // Attach user data to request
      req.user = decodedToken;

      next();
    } catch (err) {
      console.log("JWT ERROR NAME:", err.name);
      console.log("JWT ERROR MESSAGE:", err.message);

      return res.status(401).json({
        message: "invalid token",
      });
    }
  };
};
