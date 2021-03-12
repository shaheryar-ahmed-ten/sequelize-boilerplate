const RootDao = require("./root_dao")

class TestDao extends RootDao {
    constructor() {
        super("tests")
    }
}

module.exports = new TestDao()