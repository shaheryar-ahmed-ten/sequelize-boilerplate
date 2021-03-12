const express = require("express")
const { routes } = require("../../../app")
const router = express.Router()
const controller = require("./controller")
const httpStatus = require("http-status")
const { Op } = require("sequelize");


/**
 * GET /sms/templates
 * @summary Get Templates
 * @tags Templates
 * @security BearerAuth
 * @return {object} 200 - success response
 */
router.get("/", async (req, res) => {
    const { limit, offset, ...filters } = req.query;
    const params = {
        filters,
        limit,
        offset
    }
    const response = await controller.getTemplate(params);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.error)
})

/**
 * POST /sms/templates
 * @summary Add Templates
 * @tags Templates
 * @typedef {object} AddTemplate
 * @property {integer} templateId - templateId
 * @property {string}  comments - comments
 * @param {AddTemplate} request.body.required - templates info
 * @return {object} 200 - success response
 */
router.post("/", async (req, res) => {
    const response = await controller.addTemplate(req.body)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})


router.get("/:id", async (req, res) => {
    const response = await controller.getTemplateById(req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})
router.put("/:id", async (req, res) => {
    const response = await controller.updateTemplate(req.body, req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})

router.delete("/:id", async (req, res) => {
    const response = await controller.deleteTemplate(req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})

module.exports = router