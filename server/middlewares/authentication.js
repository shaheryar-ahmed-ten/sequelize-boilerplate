const { verify } = require("../../library/auth");
const appConfig = require("../../config/app");

module.exports = (req, res, next) => {
    const authorization = (req.get('Authorization') || req.headers['Authorization'] || 'undefined').toString();
    if (authorization !== 'undefined') {
        let auth = authorization.toString().split(" ")[1];
        if (auth) {
            auth = verify(auth);
            if (auth.aud === appConfig.auth.audience) {
                req.user = { "id": auth.id, "role": auth.role };
                next()
            } else {
                res.sendError(401, "Your authentication token has been expired !", null);
            }
        } else {
            res.sendError(401, "Your authentication token has been expired !", null);
        }
    } else {
        const is_secure = appConfig.auth.securePath.some(path => {
            const patt = new RegExp(path);
            return patt.exec(req.path);
        })
        if (is_secure) {
            if (req.path.indexOf("check") > -1 || req.path.indexOf("register") > -1 || req.path.indexOf("login") > -1 || req.path.indexOf("api-docs") > -1) {
                next()
            } else {
                res.sendError(401, "Un-Authorized", null);
            }
        } else {
            next()
        }
    }
}