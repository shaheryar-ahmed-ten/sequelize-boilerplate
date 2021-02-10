const db = require("../sequelize/index")
const models = require("../sequelize/models/index")
const { Op } = require("sequelize");
const { makeFilterQuery } = require("../server/constants/query")

class RootDao {
    constructor(modelName) {
        this.modelName = modelName
        this.model = models[modelName]
    }

    async getById(id) {
        const record = await this.model.findByPk(id)
        return record
    }

    async getAll(params) {
        const { offset, limit, filters, sort } = params;
        const { includeAll = false, include, attributes } = params;
        const whereClause = makeFilterQuery({ ...filters });
        const _params = { where: whereClause, limit, offset, order: sort };
        if (includeAll) _params.include = [{ all: true }];
        if (include) _params.include = include;
        if (attributes) _params.attributes = attributes;
        const { count, rows } = await this.model.findAndCountAll(_params);
        if (!rows) return null;
        return { count, records: rows };
    }

    async add(params) {
        const record = await this.model.create(params)
        return record
    }

    async addBulk(params) {
        const record = await this.model.bulkCreate(params)
        return record
    }

    async update(params, id) {
        const record = await this.model.update(params, {
            where: { id: id },
            returning: true,
            plain: true
        })
        return record
    }

    async delete(id) {
        await this.model.destroy({
            where: { id: id }
        })
        return `deleted at id=${id}`
    }

    async find(term) {
        const record = await this.model.findOne({
            where: { name: term }
        })
        return record
    }

    async findByEmail(email) {
        const record = await this.model.findOne({
            where: { email }
        })
        return record
    }

}

module.exports = RootDao
