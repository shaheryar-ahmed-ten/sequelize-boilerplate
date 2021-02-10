const express = require("express")
const Dao = require("../../../../dao")
const { error, success } = require("../../../messeges")
const httpStatus = require("http-status")

const messages = {
    user_success: "Users Success",
    user_failed: "Users Failed",
}


async function getHome(params) {
    try {
        test = "I am a non logged in user"
        return { status: httpStatus.OK, message: messages.user_success, data: test }
    } catch (err) {
        console.log("ERROR:", err)
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}


module.exports = {
    getHome
}