const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const TokenManager = require("../Lib/TokenManager");
const Model = require("../Models");

//user register
async function userRegister(payloadData) {
    try {
        if (await Service.findOne(Model.Users, { email: payloadData.email })) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXISTS);
        }
        if (await Service.findOne(Model.Users, { mobile: payloadData.mobile })) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
        }
        const password = await UniversalFunctions.CryptData(payloadData.password)
        payloadData.password = password
        let user = await Service.saveData(Model.Users, payloadData)
        if (!user) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
        }
        user = JSON.parse(JSON.stringify(user));
        delete user.password
        return user
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//user login
async function userLogin(payloadData) {
    try {
        let user = await Service.findOne(Model.Users, { email: payloadData.email })
        if (!user) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.USER_NOT_EXISTS);
        }
        if (user.isBlocked || user.isDeleted) {
            return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.BLOCKED);
        }
        const validate = await UniversalFunctions.comparePassword(payloadData.password.toString(), user.password);
        if (!validate) {
            return Promise.reject(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PASSWORD);
        }
        tokenData = await TokenManager.setToken(
            {
                _id: user._id,
                type: Config.APP_CONSTANTS.DATABASE.USER_TYPE.USER,
            },
        );
        user.accessToken = tokenData.accessToken;
        user = JSON.parse(JSON.stringify(user));
        delete user.password
        return user
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    userRegister,
    userLogin,
}

