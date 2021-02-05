const successMsg = require("./success");
const errorMsg = require("./error");
const changeMsg = require("./changes")
exports.error = (code) => {
    return errorMsg[code];
};

exports.change = (code) => {
    return errorMsg[code];
};

exports.success = (code, module_name) => {
    return `${module_name} ${successMsg[code]}`;
};

