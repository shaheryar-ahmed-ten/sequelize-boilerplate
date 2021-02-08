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
    const response = await controller.getAllUsers(params);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.code, response.message, response.status)
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

// router.get("/search", controller.search)
// router.get("/:id", controller.getUserById)
// router.put("/:id", controller.updateUser)

// router.delete("/:id", controller.deleteUser)



module.exports = router