module.exports = (req, res, next) => {
    res.sendError(404, "Route not found", null)
}