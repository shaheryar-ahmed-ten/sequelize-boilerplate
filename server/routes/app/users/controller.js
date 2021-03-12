const express = require("express")
const router = express.Router();
const db = require("../../../../config/database")
const Dao = require("../../../../dao")
const { issueToken } = require("../../../../library/auth");
const { error, success } = require("../../../messeges")
const httpStatus = require("http-status")

const messages = {
    user_success: "Users Success",
    user_failed: "Users Failer",
    notFound: "User Not Found",
    found: "User Found"
}


async function getAllUsers(params) {
    try {
        const users = await Dao.users.getAll(params);
        return { status: httpStatus.OK, message: messages.user_success, data: users }
    } catch (err) {
        return { err: err, message: err.message }
    }
}

async function getUserById(params) {
    try {
        const user = await Dao.users.getById(req.params.id)

        if (user) {
            return { data: user, message: messages.found, status: httpStatus.OK }
        } else {
            return { data: null, message: message.notFound, status: httpStatus.OK }
        }

    } catch (err) {
        return { message: err.message, status: httpStatus.CONFLICT }
    }
}

async function addUser(params) {
    try {
        const user = await Dao.users.add(params)
        return { status: httpStatus.OK, message: messages.user_success, data: user }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}

async function addMany(params) {
    try {
        const user = await Dao.users.addBulk(params)
        return { status: httpStatus.OK, message: messages.user_success, data: user }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}

async function updateUser(body, id) {
    try {
        const user = await Dao.users.update(body, id)
        return { status: httpStatus.OK, message: messages.user_success, data: user }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}

async function deleteUser(id) {
    try {
        const user = await Dao.users.delete(id)
        return { status: httpStatus.OK, message: messages.user_success, data: user }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}


async function login(param) {
    try {
        const user = await Dao.users.findByEmailPass(param.email, param.password)

        if (user) {
            console.log("user", user)
            let { token } = issueToken({ id: '1', role: 'Admin' });
            let refreshToken = issueToken({ id: '1', role: 'Admin' }, '7d');
            return { status: httpStatus.OK, message: messages.user_success, data: { token, refreshToken: refreshToken.token } }
        } else {
            return { status: httpStatus.CONFLICT, message: "NO USER FOUND", code: messages.user_failed }
        }
    } catch (err) {
        console.log("ERROR", err)
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}

module.exports = {
    getAllUsers, getUserById, addUser, login, updateUser, deleteUser
}