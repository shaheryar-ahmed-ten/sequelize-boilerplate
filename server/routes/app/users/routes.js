const express = require("express")
const router = express.Router()
const controller = require("./controller")
const httpStatus = require("http-status")
const logger = require('../../../../library/logger')("app")
debug = require('debug')('http')





router.get("/", async (req, res) => {

    const { limit, offset, ...filters } = req.query;
    const params = {
        filters,
        limit,
        offset
    }
    const response = await controller.getAllUsers(params);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.err, response.message)
})

router.post("/", async (req, res) => {
    const response = await controller.addUser(req.body)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})

// router.post("/addmany", controller.addMany)

router.post("/login", async (req, res) => {
    const response = await controller.login(req.body)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})


router.get("/:id", async (req, res) => {
    const response = await controller.getUserById(req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})
router.put("/:id", async (req, res) => {
    const response = await controller.updateUser(req.body, req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})

router.delete("/:id", async (req, res) => {
    const response = await controller.deleteUser(req.params.id)
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})

router.get("/search", async (req, res) => {

    const { limit, offset, ...filters } = req.query;
    const params = {
        filters,
        limit,
        offset
    }
    const response = await controller.getAllUsers(params);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})


module.exports = router