const RootDao = require("./root_dao")
const { encrypt } = require("../library/encryption")

class UserDao extends RootDao {
    constructor() {
        super("users")
    }
    async findByEmailPass(email, password) {
        const record = await this.model.findOne({
            where: { email, password: encrypt(password) }
        })
        return record
    }
}

module.exports = new UserDao()