const httpStatus = require("http-status")
const { AddValidation, UpdateValidation } = require("./validation")
const Dao = require("../../../../dao")


const messages = {
    success: "Template Success",
    failed: "Template Failed",
    added: "Template Added",
    updated: "Template updated",
    deleted: "Template deleted",
    found: "Template found",
    notFound: "Template not found"

}


async function getTemplate(params) {
    try {
        const templates = await Dao.templates.getAll(params)
        if (templates.count)
            return { status: httpStatus.OK, message: messages.found, data: templates }
        else
            return { status: httpStatus.OK, message: messages.notFound, data: null }
    } catch (err) {
        console.log("ERROR:", err)
        return { status: httpStatus.CONFLICT, message: messages.failed, code: err.message }
    }
}
async function addTemplate(params) {
    try {
        const isValid = await AddValidation.validateAsync(params)
        if (isValid) {
            const template = await Dao.templates.add(params)
            return { status: httpStatus.OK, message: messages.added, data: template }
        } else {
            return { status: httpStatus.UNPROCESSABLE_ENTITY, message: isValid, code: messages.failed }
        }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: messages.failed, code: err.message }
    }
}

async function getTemplateById(id) {
    try {
        const template = await Dao.templates.getById(id)

        if (template) {
            return { data: template, message: messages.found, status: httpStatus.OK }
        } else {
            return { data: null, message: message.notFound, status: httpStatus.OK }
        }

    } catch (err) {
        return { status: httpStatus.CONFLICT, message: messages.failed, code: err.message }
    }
}

async function updateTemplate(body, id) {
    try {
        const isValid = await UpdateValidation.validateAsync(body)
        if (isValid) {
            const template = await Dao.templates.update(body, id)
            return { status: httpStatus.OK, message: messages.updated, data: template }
        } else {
            return { data: null, message: message.notFound, status: httpStatus.OK }
        }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: messages.failed, code: err.message }
    }
}

async function deleteTemplate(id) {
    try {
        const template = await Dao.templates.delete(id)
        return { status: httpStatus.OK, message: messages.deleted, data: template }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: messages.failed, code: err.message }
    }
}


module.exports = {
    getTemplate, addTemplate, getTemplateById, updateTemplate, deleteTemplate
}