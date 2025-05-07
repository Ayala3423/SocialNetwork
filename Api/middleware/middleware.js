import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (id, name) => jwt.sign({ id, name }, JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
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