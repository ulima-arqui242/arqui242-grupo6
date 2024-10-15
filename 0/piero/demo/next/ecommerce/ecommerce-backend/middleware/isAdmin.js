const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function isAdmin(req, res, next) {
    try {
        const user = await userModel.findById(req.user)
                
        if (user.role != "admin") {
            throw new Error("Unauthorized user")
        }
    
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

module.exports = isAdmin