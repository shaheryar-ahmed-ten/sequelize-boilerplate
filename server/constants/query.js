const { Op } = require("sequelize");

exports.makeFilterQuery = (whereClause, transform = {}) => {

    for (let item in whereClause) {
        if (whereClause[item] === 'true') {
            whereClause[item] = true;
        } else if (whereClause[item] === 'false') {
            whereClause[item] = false;
        } else if (!isNaN(Number(whereClause[item]))) {
            whereClause[item] = Number(whereClause[item])
        }
        if (typeof whereClause[item] === "string") {
            whereClause[item] = { [Op.like]: '%' + whereClause[item] + '%' }
        }
    }
    return whereClause

}