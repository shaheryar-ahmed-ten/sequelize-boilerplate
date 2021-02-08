const Sequelize = require("sequelize");

const dbConfig = {
    username: 'postgres',
    password: '123',
    database: 'mydb',
    host: 'localhost',
    dialect: 'postgresql',
}

module.exports = dbConfig

// const sequelize = new Sequelize({
//     username: 'postgres',
//     password: '123',
//     database: 'mydb',
//     host: 'localhost',
//     dialect: 'postgres',
// });

// sequelize
//     .authenticate()
//     .then(function (success) {
//         console.info("Database connection OK!", success);
//         console.info(dbConfig.database);
//     })
//     .catch(function (error) {
//         console.error("Unable to connect to the database:");
//         console.error(error.message);
//         process.exit(1);
//     });

// module.exports = sequelize