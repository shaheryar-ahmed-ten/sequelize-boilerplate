const express = require("express")
const { routes } = require("../../../app")
const router = express.Router()
const controller = require("./controller")
const httpStatus = require("http-status")
const { Op } = require("sequelize");
const models = require("../../../../sequelize/models")
const { modelWiseFilters } = require("../../../../server/constants/query")

/**
 * GET /app/templates
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
 * POST /app/templates
 * @summary Add Templates
 * @tags Templates
 * @typedef {object} AddTemplate
 * @property {integer} templateId - templateId
 * @property {string}  comments - comments
 * @param {AddTemplate} request.body.required - templates add params
 * @security BearerAuth
 * @return {object} 200 - success response
 */
router.post("/", async (req, res) => {
    const response = await controller.addTemplate(req.body)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})


/**
 * GET /app/templates/{id}
 * @summary Get Templates
 * @tags Templates
 * @security BearerAuth
 * @param {number} id.path - The x value..
 * @return {object} 200 - success response
 */
router.get("/:id", async (req, res) => {
    const response = await controller.getTemplateById(req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})

/**
 * PUT /app/templates/{id}
 * @summary Update Templates
 * @tags Templates
 * @typedef {object} UpdateTemplate
 * @property {integer} templateId - templateId
 * @property {string}  comments - comments
 * @param {UpdateTemplate} request.body.required - templates update params
 * @security BearerAuth
 * @param {number} id.path - The x value..
 * @return {object} 200 - success response
 */
router.put("/:id", async (req, res) => {
    const response = await controller.updateTemplate(req.body, req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})

/**
 * DELETE /app/templates/{id}
 * @summary Delete Templates
 * @tags Templates
 * @param {number} id.path - The x value..
 * @security BearerAuth
 * @return {object} 200 - success response
 */
router.delete("/:id", async (req, res) => {
    const response = await controller.deleteTemplate(req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.code)
})

module.exports = router