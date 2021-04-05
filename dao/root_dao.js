const db = require("../sequelize/index")
const models = require("../sequelize/models/index")
const { Op } = require("sequelize");
const { makeFilterQuery } = require("../server/constants/query")
const { encrypt } = require("../library/encryption")

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
        let { includeAll = false, include, attributes } = params;
        const whereClause = makeFilterQuery({ ...filters });
        const _params = { where: whereClause, limit, offset, order: sort };
        if (includeAll) _params.include = [{ all: true }];
        if (include) _params.include = include;
        if (attributes) _params.attributes = attributes;
        _params.where.deletedAt = null
        // console.log("---------------------------------------------\nPARAMS", _params)
        const { count, rows } = await this.model.findAndCountAll(_params);
        if (!rows) return null;
        return { count, records: rows };
    }

    async getOne(params) {
        const { offset, limit, filters, sort } = params;
        let { includeAll = false, include, attributes } = params;
        const whereClause = makeFilterQuery({ ...filters });
        const _params = { where: whereClause, limit, offset, order: sort };
        if (includeAll) _params.include = [{ all: true }];
        if (include) _params.include = include;
        if (attributes) _params.attributes = attributes;
        _params.where.deletedAt = null
        // console.log("---------------------------------------------\nPARAMS", _params)
        const data = await this.model.findOne(_params);
        return { records: data };
    }

    async add(params) {
        params.password = params.password ? encrypt(params.password) : undefined
        const record = await this.model.create(params)
        console.log("RECORD", record)
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
        const exist = await this.model.findByPk(id)
        console.log("exist", exist)
        if (exist.dataValues.deletedAt == null) {
            const record = await this.model.update(
                { deletedAt: new Date() }, {
                where: { id: id },
                returning: true,
                plain: true
            })
            return `deleted at id=${id}`
        } else {
            return `record with id=${id} already deleted`
        }
    }

    async hardDelete(id) {
        await this.model.destroy({
            where: { id }
        })
        return `deleted at id=${id}`
    }

    async find(term) {
        const record = await this.model.findOne({
            where: { name: term }
        })
        return record
    }
}

module.exports = RootDao
