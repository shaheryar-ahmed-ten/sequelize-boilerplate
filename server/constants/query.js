const { Op } = require("sequelize");

exports.makeFilterQuery = (whereClause, transform = {}) => {

    for (let item in whereClause) {
        if (whereClause[item] === 'true') {
            whereClause[item] = true;
        } else if (whereClause[item] === 'false') {
            whereClause[item] = false;
        } else if (!isNaN(Number(whereClause[item]))) {
            whereClause[item] = Number(whereClause[item])
        }
        if (typeof whereClause[item] === "string") {
            whereClause[item] = { [Op.like]: '%' + whereClause[item] + '%' }
        }
    }
    return whereClause
}

exports.modelWiseFilters = (filters, modelname) => {

    const filterObj = {}

    for (const key in filters) {
        // if(key.split(".")[1] != ('to' || 'from')){

        // }
        model = key.split(".")[0]
        if (filterObj[model] == undefined) {
            filterObj[model] = { [key.split(".")[1]]: filters[key] } //if user model doesn't exist: users = {name:"shaheryar"}
        } else {
            filterObj[model][key.split(".")[1]] = filters[key] //if user model exist: users.name = "shaheryar"
        }
    }

    // console.log("filterObj", filterObj) //{users :{name:"shaheryar"}}

    let obj = Object.keys(filterObj).map(function (key, index) {
        if (key == modelname) {
            return filterObj[key]
        };
    }).filter(function (x) {
        console.log("x:", x)
        return x !== undefined;
    })[0]

    console.log("OBJECT1", obj)
    if (obj) {
        const { to, from } = obj
        if (to && from) {
            obj = removeFromObject(obj, ["to", "from"])[0]
            obj["createdAt"] = {
                [Op.gte]: from,
                [Op.lte]: to,
            }
        }
        return obj
    } else return {
        //include all elements
        id: {
            [Op.gt]: 0
        }
    };
}