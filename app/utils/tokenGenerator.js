const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const tokenGenerator = (payload) => {
    console.log({payload})
    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "365 days"})
    console.log({token})
    return token;
}


module.exports = {tokenGenerator};