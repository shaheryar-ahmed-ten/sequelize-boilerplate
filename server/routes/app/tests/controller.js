const express = require("express")
const router = express.Router();
const db = require("../../../../config/database")
const Dao = require("../../../../dao")
const { issueToken } = require("../../../../library/auth");
const { error, success } = require("../../../messeges")
const httpStatus = require("http-status")

const messages = {
    user_success: "Users Success",
    user_failed: "Users Success",
}


async function getAllTests(params) {
    try {
        const tests = await Dao.accounts.getAll(params);
        
        return { status: httpStatus.OK, message: messages.user_success, data: tests }
    } catch (err) {
        console.log("ERROR:", err)
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}


module.exports = {
    getAllTests
}