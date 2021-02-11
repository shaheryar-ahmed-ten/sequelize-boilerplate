const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const { middlewares } = require("../config/app");
const i18n = require("i18n");
const passport = require("../library/passport")
const logCat = require("../library/logger")("app")
const { getUniqueArray, dateCompCurrent } = require("parse-my-object")


const app = express()

app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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


// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//     res.send("INDEX")
// })

//Users
// app.use('/users', require('../routes/app/users/routes.js'));


module.exports = app