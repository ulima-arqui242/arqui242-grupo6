const userModel = require("../../models/userModel")

async function userLoginController(req,res) {
    try{        
        const user = await userModel.findById(req.user)

        res.status(200).json({
            message: "User profile",
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