const { hashPassword } = require("../../helpers/authHelper");
const userModel = require("../../models/userModel")

async function userSignUpController(req,res) {
    try{
        const { email, password, name, phone, address } = req.body
        

        if (!email) {
            throw new Error("Please provide an email");
        }
        if (!password) {
            throw new Error("Please provide a password");
        }
        if (!name) {
            throw new Error("Please provide a name");
        }
        if (!phone) {
            throw new Error("Please provide a phone number");
        }
        if (!address) {
            throw new Error("Please provide an address");
        }        
        const userWithEmail = await userModel.findOne({email})
        if(userWithEmail){
            throw new Error("Email already used")
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new userModel({email, password:hashedPassword, name, phone, address})
        const user = await newUser.save()

        const newCart = new cartModel({ user_id: user._id })
        await newCart.save()

        res.status(201).json({
            message: "User created successfully",
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

module.exports = userSignUpController