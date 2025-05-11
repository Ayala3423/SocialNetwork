import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (id, username, password) => jwt.sign({ id, username, password }, JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token:", token);

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "There is no token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "The token is invalid" });
  }
};