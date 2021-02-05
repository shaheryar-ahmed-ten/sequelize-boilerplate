const RootDao = require("./root_dao")

class UserDao extends RootDao {
    constructor() {
        super("users")
    }


}

module.exports = new UserDao()