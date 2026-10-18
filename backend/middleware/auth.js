const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = auth;
