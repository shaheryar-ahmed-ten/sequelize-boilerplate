const logCat = require("../../library/logger")("app");
const { limit } = require("../../config/app").pagination
module.exports = function (req, res, next) {
    // Just for temp impl
    if (req.query.hasOwnProperty("page")) {
        req.query.offset = req.query.page ? req.query.page : 0
    }
    req.offset = req.query.offset ? req.query.offset : 0;
    req.query.limit = req.query.limit ? req.query.limit : limit;
    console.log("REQUEST offset:", req.offset, "\treq query:", req.query)
    // const lang = (req.get('LANG') || req.headers['LANG'] || 'en').toString();
    // req.setLocale(lang == 'ar' ? 'ur' : lang)
    res.sendJson = (data, msg = null) => {
        let resObj = { status: true, message: msg ? req.__(msg) : msg, error: null };
        if (typeof data == "object") {
            resObj.data = data;
        } else {
            resObj.data = { app_code: data };
        }
        res.json(resObj);
    }

    res.sendError = (error_obj, msg = null, status = 200) => {
        logCat(`==================================================================================\n`)
        logCat(`url: ${req.originalUrl}`)
        logCat(error_obj)
        logCat(`==================================================================================\n`)
        // writeLog({"scheme": req.protocol, "url": req.originalUrl, "RequestMethod": req.method, "IP": req.ip, "headers": req.headers, "body": req.body, "query": req.query, "res": res.statusCode}, msg)
        res.status(status).json({ status: false, message: msg ? msg : null, data: null, error: error_obj });
    }
    next();
}