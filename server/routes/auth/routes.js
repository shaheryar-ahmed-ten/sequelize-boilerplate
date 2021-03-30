const express = require("express")
const router = express.Router()
const { AuthService } = require("./service")
const httpStatus = require("http-status")
const logger = require('../../../library/logger')("app")
debug = require('debug')('http')

const authService = new AuthService()

/**
 * POST /auth/register
 * @summary Register for any user
 * @tags Auth
 * @typedef {object} UserRegistration
 * @example request - example payload
 * {
 *  "fullName": "string",
 *  "email":"shah@gmail.com",
 *  "password":"123456",
 *  "mobile":"+923343696000",
 * "role_id":1
 * }
 * @param {UserRegistration} request.body.required - user info
 * @return {object} 200 - success response
 */
router.post("/register", async (req, res, next) => {
    const response = await authService.register(req.body);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.status, response.message, response.err)
})


/**
 * POST /auth/login
 * @summary Login for any user
 * @tags Auth
 * @typedef {object} UserLogin
 * @property {string} email.required - Email Address
 * @property {string} password.required - Password
 * @param {UserLogin} request.body.required - user info
 * @return {object} 200 - success response
 */
router.post("/login", async (req, res, next) => {
    const response = await authService.login(req.body);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.err, response.message)
})


/**
 * POST /auth/forget
 * @summary Make reset token for reset password
 * @tags Auth
 * @typedef {object} ForgetPassword
 * @property {string} email.required - Email Address
 * @param {ForgetPassword} request.body.required - user info
 * @return {object} 200 - success response
 */
router.post("/forget", async (req, res, next) => {
    const response = await authService.forget(req.body);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.err, response.message)
})

/**
 * POST /auth/reset
 * @summary Make reset token for reset password
 * @tags Auth
 * @typedef {object} ResetPassword
 * @property {string} resetToken.required - Reset Token
 * @property {string} password.required - Password
 * @param {ResetPassword} request.body.required - user info
 * @return {object} 200 - success response
 */
router.post("/reset", async (req, res, next) => {
    const response = await authService.resetPassword(req.body);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.err, response.message)
})

/**
 * GET /auth/me
 * @summary Get auth user info
 * @tags Auth
 * @security BearerAuth
 * @return {object} 200 - success response
 */
router.get("/me", async (req, res, next) => {
    const response = await authService.me(req.user);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.err, response.message)
})

/**
 * PUT /auth/me
 * @summary Register for any user
 * @tags Auth
 * @security BearerAuth
 * @typedef {object} UserProfile
 * @property {string} fullName - First Name
 * @property {string} mobile - mobile
 * @property {string} email - Email Address
 * @property {string} password - Password
 * @param {UserProfile} request.body.required - user info
 * @return {object} 200 - success response
 */
router.put("/me", async (req, res, next) => {
    const response = await authService.updateProfile(req.body, req.user.id);
    if (response.status === httpStatus.OK) res.sendJson(response.data, response.message, response.status)
    else res.sendError(response.err, response.message)
})

module.exports = router