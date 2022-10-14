const User =  require("../models/userModel")
const jwt = require('jsonwebtoken')

//4.ai. Signing tokens with json web tokens
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const signupUser = async (req, res) => {
    const {email, password} = req.body


    //1.b. signing up and hashing passwords
    try {
        const user = await User.signup(email, password)

        //4.aii. : Create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {

    //5.b.loging in users
    const {email, password} = req.body


    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}