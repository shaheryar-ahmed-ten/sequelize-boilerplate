module.exports = (req, res, next) => {
    if (req.user) {
        const _role = req.url.split("/")[1];
        if (_role == "media" || _role == "setting") {
            return next()
        } else {
            if (String(req.user.role).toLocaleLowerCase() === _role || _role == 'auth') {
                next()
            } else {
                // const _innerRole = `${_role} ${req.url.split("/")[2]}`;
                // if (_role === "warehouse") {
                //     if (String(req.user.role).toLocaleLowerCase() === _innerRole) {
                //         next()
                //     } else {
                //         res.sendError(null, "Un-Authorized user !", 401);
                //     }
                // } else if (_role === "supplier") {
                //     if (String(req.user.role).toLocaleLowerCase() === "external supplier") {
                //         next()
                //     } else {
                //         res.sendError(null, "Un-Authorized user !", 401);
                //     }
                // } else {
                //     res.sendError(null, "Un-Authorized user !", 401);
                // }
                // next()
                res.sendError(401, "Un-Authorized user !", null);
            }
        }
    } else {
        next()
    }
}