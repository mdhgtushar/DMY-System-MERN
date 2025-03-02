const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // 🔹 নিশ্চিত হও যে User Model ইমপোর্ট করা হয়েছে

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 🔥 Token আছে কিনা চেক করো
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        // 🔹 Bearer টোকেন থেকে কেবল টোকেন অংশটা বের করো
        const token = authHeader.split(" ")[1]; 

        // 🔹 টোকেন ভেরিফাই করো
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        // 🔹 ইউজার ডাটাবেজে আছে কিনা চেক করো
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // 🔹 req.user-এ ইউজার ডাটা রাখো
        next(); // ✅ Middleware শেষ

    } catch (error) { 
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;
