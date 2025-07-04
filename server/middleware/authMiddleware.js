import jwt from 'jsonwebtoken';

// ✅ authMiddleware
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Token not valid" });
    }

    req.user = decoded; // or fetch user from DB if needed
    next();
  } catch (error) {
    console.error("authMiddleware Error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ✅ verify
export const verify = (req, res) => {
  return res.status(200).json({
    status: "success",
    user: req.user,
  });
};
