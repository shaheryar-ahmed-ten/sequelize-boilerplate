'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "color" from table "cars"
 *
 **/

var info = {
    "revision": 10,
    "name": "delete_car_color",
    "created": "2021-02-23T14:57:42.238Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["cars", "color"]
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
