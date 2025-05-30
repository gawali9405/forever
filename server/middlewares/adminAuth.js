import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized admin access.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in admin authentication",
      error: error.message,
      success: false,
    });
  }
};

export default adminAuth;
