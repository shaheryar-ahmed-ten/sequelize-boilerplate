const RootDao = require("./root_dao")

class TemplateDao extends RootDao {
    constructor() {
        super("templates")
    }
}

module.exports = new TemplateDao()