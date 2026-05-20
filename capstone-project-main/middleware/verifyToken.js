export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      console.log("Cookies:", req.cookies);
console.log("SECRET_KEY exists:", !!process.env.SECRET_KEY);
      const token = req.cookies?.token;

      if (!token) {
        console.log("No token found");
        return res.status(401).json({ message: "please login first" });
      }

      const decodedToken = verify(token, process.env.SECRET_KEY);

      console.log("Decoded Token:", decodedToken);

      if (!allowedRoles.includes(decodedToken.role)) {
        console.log("Role mismatch:", decodedToken.role);
        return res.status(403).json({ message: "you are not authorized" });
      }

      req.user = decodedToken;
      next();
    } catch (err) {
      console.log("JWT ERROR:", err.message);
      return res.status(401).json({ message: "invalid token" });
    }
  };
};
