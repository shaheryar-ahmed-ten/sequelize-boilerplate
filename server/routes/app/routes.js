const fs = require("fs");
const express = require("express");
const router = express.Router();

fs.readdirSync(__dirname).forEach((file) => {
    if (fs.statSync(`${__dirname}/${file}`).isDirectory()) {
        router.use(`/${file}`, require(`./${file}/routes.js`));
    }
});

module.exports = router