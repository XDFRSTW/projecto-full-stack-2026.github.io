const jwt = require("jsonwebtoken");
const User = require("../models/user");


async function authMiddleware(req, res, next) {
    const authHeader = req.headers.athorization;
    if (!authHeader) {
        return res.status(401).json({ message: "inautorizado" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json( {message: "inautorizado", error });
    }
}

module.exports = authMiddleware;