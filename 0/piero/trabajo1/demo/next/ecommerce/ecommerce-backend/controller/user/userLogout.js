
async function userLogoutController(req,res) {
    try{        
        res.clearCookie("token")

        res.status(200).json({
            message: "Logged out successfully",
            success: true,
            error: false,
            data: []
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message || err ,
            error: true,
            success: false,
        })
    }
}

module.exports = userLogoutController