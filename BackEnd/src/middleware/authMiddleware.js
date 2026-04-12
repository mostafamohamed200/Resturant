import jwt from "jsonwebtoken";

const SECRET_KEY = "secret123";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No token");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("Invalid token");

    req.user = user;
    next();
  });
};