const { JWT, JWK } = require("jose");
const jsonwebtoken = require("jsonwebtoken")

const { auth } = require("../config/app");
const { openid } = require("../config/app")

module.exports = {
    generateKey: (payload = {}) => {
        payload["iat"] = Date.now()
        return JWT.sign(payload, JWK.asKey(openid.jwt.secretOrKey), { audience: openid.jwt.audience, expiresIn: "1d", algorithm: "HS256" });
    },

    verify: (token = null) => {
        return JWT.verify(token, JWK.asKey(openid.jwt.secretOrKey))
    },

    issueToken: (user, expiresIn = openid.jwt.expiresIn) => {
        const payload = {
            user, "iat": Date.now(), "aud": openid.jwt.audience
        }
        const token = jsonwebtoken.sign({ user }, openid.jwt.secretOrKey, {
            algorithm: 'HS256',
            audience: openid.jwt.audience,
            expiresIn
        })
        return {
            token
        }
    }
}