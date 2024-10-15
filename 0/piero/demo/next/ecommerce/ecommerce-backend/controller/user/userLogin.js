const { comparePassword } = require("../../helpers/authHelper");
const userModel = require("../../models/userModel")
var jwt = require('jsonwebtoken')

async function userLoginController(req,res) {
    try{
        const { email, password } = req.body
        
        if (!email) {
            throw new Error("Please provide an email");
        }
        if (!password) {
            throw new Error("Please provide a password");
        }
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        const checkPassword = await comparePassword(password, user.password)
        if(!checkPassword){
            throw new Error("Incorrect password")
        }
        
        const tokenData = {
            _id: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 8 }) // 8 hours

        const tokenOption = {
            httpOnly: true,
            secure: true
        }

        res.cookie("token",token,tokenOption).json({
            message: "Logged in successfully",
            success: true,
            error: false,
            data: user
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userLoginController