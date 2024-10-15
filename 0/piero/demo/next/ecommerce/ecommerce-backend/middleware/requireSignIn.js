const jwt = require('jsonwebtoken');

async function requireSignIn(req, res, next) {
    try {
        const token = req.cookies?.token
        
        if (!token) {
            throw new Error("User not logged in")
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded._id;
        next();
        
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: err.message || err,
            data: [],
            success: false,
            error: true
        })
    }
}

module.exports = requireSignIn