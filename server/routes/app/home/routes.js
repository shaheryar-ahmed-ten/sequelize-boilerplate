const express = require("express")
const { routes } = require("../../../app")
const router = express.Router()
const controller = require("./controller")
const httpStatus = require("http-status")


router.get("/", async (req, res) => {
    const { limit, offset, ...filters } = req.query;
    const params = {
        filters,
        limit,
        offset
    }
    const response = await controller.getHome(params);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
})

module.exports = router