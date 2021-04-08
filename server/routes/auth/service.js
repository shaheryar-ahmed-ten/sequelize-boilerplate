const DAO = require("../../../dao")
const { issueToken } = require("../../../library/auth");
const httpStatus = require("http-status")
const messages = require("./messages")
const { RegisterValidation, LoginValidation, ForgetValidation, ResetValidation, updateValidation } = require("./validation")
class AuthService {

    async register(params) {
        try {
            const isValid = await RegisterValidation.validateAsync(params)
            if (isValid) {
                console.log("validation success")

                const found = await DAO.users.getUserByEmail(params.email)
                if (!found) {
                    const users = await DAO.users.register(params)
                    return { status: httpStatus.OK, message: messages.user_success, data: users }
                } else {
                    return { status: httpStatus.CONFLICT, message: messages.isExist }
                }
            } else {
                console.log("validation failed")
                return { status: httpStatus.UNPROCESSABLE_ENTITY, message: messages.user_failed, err: isValid }
            }
        } catch (err) {
            console.log("ERROR:", err)
            return { status: httpStatus.CONFLICT, message: messages.user_failed, code: err.message }
        }
    }

    async login(params) {
        try {
            const isValid = await LoginValidation.validateAsync(params)
            if (isValid) {
                const user = await DAO.users.authUser(params.mobile, params.password)
                if (user) {
                    let tokens = {
                        token: issueToken({ id: user.id, role: user.roles[0].name }).token,
                        refreshToken: issueToken({ id: user.id, role: user.roles[0].name }, '7d').token
                    }
                    return { status: httpStatus.OK, message: messages.LOGIN_SUCCESS, data: tokens }
                } else {
                    return { status: httpStatus.NOT_FOUND, message: messages.notFound, code: messages.user_failed }
                }
            } else {
                return { status: httpStatus.UNPROCESSABLE_ENTITY, message: isValid, code: messages.user_failed }
            }
        } catch (err) {
            console.log("ERR", err)
            return { status: httpStatus.CONFLICT, message: err.message, code: err.message }
        }
    }

    async me(params) {
        try {
            const user = await DAO.users.getProfile({ id: params.id })
            return { status: httpStatus.OK, message: messages.user_success, data: user }
        } catch (err) {
            console.log("ERROR", err)
            return { status: httpStatus.CONFLICT, message: messages.user_failed, code: err.message }
        }
    }

    async forget(params) {
        try {
            const isValid = await ForgetValidation.validateAsync(params)
            if (isValid) {
                const token = await DAO.users.makeResetToken(params["email"])
                return { status: httpStatus.OK, message: messages.user_success, data: { token } }
            } else {
                return { status: httpStatus.UNPROCESSABLE_ENTITY, message: isValid, code: messages.user_failed }
            }
        } catch (err) {
            console.log("ERR", err.message)
            return { status: httpStatus.CONFLICT, message: messages.user_failed, code: err.message }
        }
    }

    async resetPassword(params) {
        try {
            const isValid = await ResetValidation.validateAsync(params)
            if (isValid) {
                const user = await DAO.users.getProfile({ resetToken: params["resetToken"] }, [])
                if (params["password"] == user["password"]) {
                    return { status: httpStatus.CONFLICT, message: messages.PASSWORD_SAME, data: {} }
                }
                const update = await DAO.users.updatePassword(params["password"], params["resetToken"])
                if (update) {
                    return { status: httpStatus.OK, message: messages.user_success, data: {} }
                } else {
                    return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
                }
            } else {
                return { status: httpStatus.UNPROCESSABLE_ENTITY, message: isValid, code: messages.user_failed }
            }
        } catch (err) {
            return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
        }
    }

    async updateProfile(params, userId) {
        try {
            const isValid = await updateValidation.validateAsync(params)
            if (isValid) {
                const user = await DAO.users.updateProfile(params, { id: userId })
                return { status: httpStatus.OK, message: messages.user_success, data: user }
            } else {
                return { status: httpStatus.UNPROCESSABLE_ENTITY, message: isValid, code: messages.user_failed }
            }
        } catch (err) {
            return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
        }
    }

}

module.exports = {
    AuthService
}