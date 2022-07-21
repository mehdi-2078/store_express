const createError = require("http-errors");
const bcrypt = require("bcrypt");

const {UserModel} = require("../models/users");
const {hashString} = require("../utils/hashstring");
const {tokenGenerator} = require("../utils/tokenGenerator");
const randomNumberGenerator = require("../utils/randomNumber");

const register = async (req, res, next) => {
    try {
        console.log('try')
        const {first_name, last_name, username, password, email, mobile} = req.body;
        const hash_password = hashString(password)
        const user = await UserModel.findOne({username});
        let newUser;
        if (user) throw createError(403, `User ${username} already exists`);
        newUser = await UserModel.create({
            first_name, last_name, username,
            email, password: hash_password, mobile
        })
        return res.json(newUser);
    } catch (err) {
        next(err);
    }
}

const getOtp = async (req, res, next) => {
    try {
        const {mobile} = req.body;
        const code = randomNumberGenerator();
        await UserModel.findOneAndUpdate(mobile, {
            mobile, otp: {
                code, expiration: (new Date().getTime() + 120000),
            }
        }, {new: true});
        return res.status(200).send({
            data: {statusCode: 200, message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد", code, mobile}
        });
    } catch (err) {
        next(err)
    }
}

const checkOtp = async (req, res, next) => {
    try {
        const {mobile, code} = req.body;
        const now = new Date().getTime();
        const user = await UserModel.findOne({mobile}, {password: 0});
        if (!user) throw createError.NotFound('کاربر یافت نشد.');
        if (user?.otp?.code != code) res.status(401).json("کد ارسال شده صحیح نمیباشد");
        if (user?.otp?.expiration < now) res.status(401).json("کد شما منقضی شده است");
        return res.status(200).send({
            data: {statusCode: 200, message: "احراز هویت شما با موفقیت انجام شد", mobile}
        });
    } catch (err) {
        console.log({err})
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await UserModel.findOne({username});
        console.log({user})
        if (!user) res.status(401).json({
            status: 401, success: false, message: "نام کاربری یا رمز عبور اشتباه میباشد",
        })
        const compareResult = bcrypt.compareSync(password, user.password);
        console.log({compareResult})
        if (!compareResult) res.status(401).json({
            status: 401, success: false, message: "نام کاربری یا رمز عبور اشتباه میباشد",
        })
        const token = tokenGenerator({username});
        user.token = token;
        await user.save()
        return res.status(200).json({
            status: 200, success: true, message: "شما با موفقیت وارد حساب کاربری خود شدید", token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {register, getOtp, checkOtp};
