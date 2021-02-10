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


async function getAllUsers(params) {
    try {
        const users = await Dao.users.getAll(params);
        return { status: httpStatus.OK, message: messages.user_success, data: users }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}

async function getUserById(params) {
    try {
        // const user = await User.findOne({
        //     where: { id: req.params.id }
        // })
        // const user = await Myuser.getById()
        const user = await Dao.users.getById(req.params.id)

        console.log("user", user)

        if (user) {
            res.sendJSON(user)
        } else {
            res.sendError(null, error("notFound").message)
        }

    } catch (err) {
        console.log("ERROR:", err)
        res.sendError(err, error("serverError").message)
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

exports.addMany = async (req, res) => {
    await Dao.users.addBulk(req.body).then(users => res.send(users))
        .catch(err => res.send(err.message))
}

exports.updateUser = async (req, res) => {
    try {

        // let myuser = await User.findByPk(req.params.id)
        const myuser = await Dao.users.update(req.body, req.params.id)
        console.log("myUSER:", myuser)
        res.send(myuser)
    } catch (err) {
        console.log("error:", err)
        res.send("err");
    }

}

exports.deleteUser = async (req, res) => {
    try {
        const user = await Dao.users.delete(req.params.id)
        console.log("user", user)
        res.send("deleted")
    } catch (err) {
        console.log("ERROR:", err)
        res.send(err);
    }
}

exports.search = async (req, res) => {
    await Dao.users.find(req.params.id)
        .then(user => {
            // console.log("users", users)
            res.send(user)
        }).catch(err => console.log(err))
}

async function login(param) {
    try {
        const user = await Dao.users.findByEmail(param.email)

        if (user) {
            console.log("user", user)
            let { token } = issueToken({ id: '1', role: 'Admin' });
            let refreshToken = issueToken({ id: '1', role: 'Admin' }, '7d');
            return { status: httpStatus.OK, message: messages.user_success, data: { token, refreshToken: refreshToken.token } }
        } else {
            return { status: httpStatus.CONFLICT, message: "NO USER FOUND", code: messages.user_failed }
        }
    } catch (err) {
        return { status: httpStatus.CONFLICT, message: err.message, code: messages.user_failed }
    }
}

module.exports = {
    getAllUsers, getUserById, addUser, login
}