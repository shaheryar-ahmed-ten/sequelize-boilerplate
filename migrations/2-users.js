'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "password" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "users",
    "created": "2021-02-10T07:45:27.743Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "password",
        {
            "type": Sequelize.STRING,
            "field": "password"
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
