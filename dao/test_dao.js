const RootDao = require("./root_dao")

class TestDao extends RootDao {
    constructor() {
        super("test")
    }
}

module.exports = new TestDao()