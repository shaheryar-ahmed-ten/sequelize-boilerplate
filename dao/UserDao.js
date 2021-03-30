const BaseDao = require("./root_dao")
const UserRole = require("./UserRoleDao")
const { encrypt, decrypt } = require("../library/encryption")
const { removeFromObject } = require("../library/objectFilter")
const { makeRandom } = require("../library/random")

class UserDao extends BaseDao {
    constructor() {
        super("users")
    }

    async register(params) {
        if (params.hasOwnProperty("password")) {
            params["password"] = encrypt(params["password"])
        }
        const user = await this.model.create(removeFromObject(params, ["role_id", "details"])[0])
        await UserRole.associateUser(user.id, params["role_id"])
        return user
    }

    async authUser(email, password) {
        const auth = await this.model.findOne({
            where: {
                email, password: encrypt(password)
            }
        })
        console.log(auth, email, password)
        return auth
    }

    async getProfile(params, exclude = ["password"]) {
        const user = await this.model.findAll({ where: params })
        console.log(user.hasOwnProperty("password"))
        if (user["password"]) {
            user["password"] = decrypt(user["password"])
        }
        return user
        // return {}
    }

    async makeResetToken(email) {
        let token = makeRandom(32)
        const resetToken = await this.model.update({ resetToken: token }, { where: { email }, returning: true, plain: true })
        console.log("RESET TOKEN:", resetToken)
        return token
    }

    async updatePassword(password, token) {
        const updatePassword = await this.model.update({ resetToken: "", password: encrypt(password) }, { where: { resetToken: token } })
        return updatePassword
    }

    async updateProfile(params, whereParams) {
        const user = await this.model.update(params, { where: whereParams, attributes: { exclude: ["password"] }, returning: true })
        return user[1][0]
    }

    async getUserByEmail(email) {
        const user = await this.model.findOne({
            where: {
                email
            }
        })
        return user
    }
}

module.exports = new UserDao()