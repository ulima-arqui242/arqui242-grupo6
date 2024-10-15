const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userLoginController = require('../controller/user/userLogin')
const userProfileController = require('../controller/user/userProfile')
const userLogoutController = require('../controller/user/userLogout')

const requireSignIn = require('../middleware/requireSignIn')
const isAdmin = require('../middleware/isAdmin')


router.post("/signup", userSignUpController)
router.post("/login", userLoginController)
router.get("/profile", requireSignIn, userProfileController) // Requires login to access
router.get("/logout", userLogoutController)


module.exports = router