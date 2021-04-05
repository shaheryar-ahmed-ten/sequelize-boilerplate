const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const { middlewares } = require("../config/app");
const i18n = require("i18n");
const passport = require("../library/passport")
const logCat = require("../library/logger")("app")
const expressJSDocSwagger = require('express-jsdoc-swagger');
const cors = require('cors')

const app1 = 'app'
const app2 = "app2"
const commit = "master commit 1"
const app = express()
app.use(cors())

const swagOpts = {
    info: {
        version: '1.0.0',
        title: 'project-name'
    },
    security: {
        BearerAuth: {
            type: 'http',
            scheme: 'Bearer',
        },
    },
    filesPattern: ['./**/routes.js', './**/**/routes.js'], // Glob pattern to find your jsdoc files (it supports arrays too ['./**/*.controller.js', './**/*.route.js'])
    swaggerUIPath: '/api-docs', // SwaggerUI will be render in this url. Default: '/api-docs'
    baseDir: __dirname,
    exposeSwaggerUI: true, // Expose OpenAPI UI. Default true
    exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
    // apiDocsPath: '/api-docs', // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
}
expressJSDocSwagger(app)(swagOpts);

app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    const log = { "scheme": req.protocol, "url": req.originalUrl, "RequestMethod": req.method, "IP": req.ip, "headers": req.headers, "body": req.body, "file": req.file, "files": req.files, "query": req.query, "res": res.statusCode }
    logCat(log)
    next();
})

middlewares.forEach((middleware) => {
    if (middleware.pos === "before") {
        app.use(require(middleware.url))
    }
})

// setting up i18n
i18n.configure({
    locales: ['en', 'ur', 'ar'],
    directory: `${__dirname}/locales`
});

app.use(i18n.init);

fs.readdirSync('./server/routes/').forEach((file) => {
    if (fs.statSync(`./server/routes/${file}`).isDirectory()) {
        logCat(`adding route ${__dirname}/${file} file:${file}`);
        app.use(`/${file}`, require(`./routes/${file}/routes.js`)) // /app , ./routes/app/routes.js
    }
});

middlewares.forEach((middleware) => {
    if (middleware.pos === "after") {
        app.use(require(middleware.url))
    }
})

module.exports = app

branchtemp2commit1
branchtemp2commit2
branchtemp2commit3
branchtemp2commit4
branchtemp2commit5
temp2commit1
temp2commit2