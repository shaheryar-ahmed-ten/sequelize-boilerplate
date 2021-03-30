const BaseDao = require("./root_dao")

class UserRoleDao extends BaseDao {
    constructor() {
        super("user_roles")
    }

    async associateUser(user_id, role_id) {
        console.log("--------------------------------------------------------\nUSERID:", user_id, "ROLE_ID:", role_id)
        return this.model.create({ user_id, role_id })
    }
}
module.exports = new UserRoleDao()