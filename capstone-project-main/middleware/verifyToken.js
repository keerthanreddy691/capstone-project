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

      if (!token) {
        console.log("No token found");
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
      console.log("Cookies:", req.cookies);

const token = req.cookies?.token;
console.log("Token:", token);

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

      // Attach user info to request
      req.user = decodedToken;

      next();
    } catch (err) {
  console.log("JWT ERROR:", err.name);
  console.log("JWT ERROR MESSAGE:", err.message);

  return res.status(401).json({
    message: "invalid token",
  });
}
  };
};
