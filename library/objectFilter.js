const i18n = require("i18n")
const moment = require("moment")

exports.excludeOthers = (obj, keys = []) => {
    if (Array.isArray(obj)) {
        return Object.assign({}, obj).map((item) => {
            keys.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                } else {
                    delete item[key];
                }
            });
            return item;
        });
    } else {
        return [Object.assign({}, obj)].map((item) => {
            keys.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                } else {
                    delete item[key];
                }
            });
            return item;
        });
    }
}

exports.removeFromObject = (obj, keys = []) => {
    if (Array.isArray(obj)) {
        return Object.assign([], obj).map((item) => {
            keys.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    delete item[key];
                }
            });
            return item;
        });
    } else {
        return [Object.assign({}, obj)].map((item) => {
            keys.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    delete item[key];
                }
            });
            return item;
        });
    }
}


exports.retainFromObject = (obj, keys = []) => {
    if (Array.isArray(obj)) {
        return Object.assign([], obj).map((item) => {
            let resObj = {};
            keys.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    resObj[key] = item[key];
                }
            });
            return resObj;
        });
    } else {
        return [Object.assign({}, obj)].map((item) => {
            let resObj = {};
            keys.forEach((key) => {
                if (item.hasOwnProperty(key)) {
                    resObj[key] = item[key];
                }
            });
            return resObj;
        });
    }
}

exports.makeStringify = (obj, keys = []) => {
    console.log(obj, keys)
    keys.forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = JSON.stringify(obj[key])
        }
    })
    return obj
}

exports.transformFields = (req, obj, fields = {}) => {
    Object.keys(fields).forEach((key) => {
        let objKey = fields[key][i18n.getLocale(req)];
        if (obj.hasOwnProperty(objKey)) {
            obj[key] = obj[objKey]
        }
    })
    return obj
}

exports.getUniqueArray = (array, key) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
        if (!map.has(item[key])) {
            map.set(item[key], true);    // set any value to Map
            result.push(item);
        }
    }
    return result;
}

exports.uniqueArray = (value, index, self) => {
    return self.indexOf(value) === index;
}

exports.shuffleArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

exports.getETA = (start_at, prioities) => {
    return prioities.map(priority => {
        let lessMinutes = (priority.priority == 1 ? 30 : 50) * (priority.priority <= 2 ? 1 : priority.priority - 1);
        return {
            "stop_id": priority.stop_id,
            lessMinutes,
            "min": moment(start_at).add(lessMinutes, "minutes").format("DD/MM/YYYY hh:mm a").toString(),
            "max": moment(start_at).add(lessMinutes, "minutes").add(1, "hour").format("DD/MM/YYYY hh:mm a").toString()
        }
    })
}


/**
 * 
 * @param {Datetime} starts_at 
 * @param {Object} date_interval 
 * @param {Number} prioity 
 * @param {Number} formatPriority 
 * @param {Number} filterPriorities
 * 
 * @description s1 = 30, s2 = 30+20, s3 = 50+30+20, s4 = 50+50+30+20, s5 = 50+50+50+30+20 
 */
exports.popPriorities = (starts_at, date_interval, prioity, formatPriority, filterPriorities) => {
    // prioity = filterPriorities > Number(prioity) ? Number(prioity) - 1 : Number(prioity)
    const obj = {
        "lastPriority": String(prioity),
        "prioity": Number(formatPriority),
        "minutes": (date_interval.minutes + (Number(formatPriority) >= 2 ? 20 : 0)) * (Number(formatPriority) - 1),
        "dur": moment.duration(date_interval.minutes * (Number(prioity)), "minutes").asMinutes().toString() ? "0" : moment.duration(date_interval.minutes * (prioity + 1), "minutes").asMinutes().toString(),
        "min": moment(starts_at).add((date_interval.minutes + (Number(formatPriority) >= 2 ? 20 : 0)) * (Number(formatPriority) - 1), "minutes").format("DD/MM/YYYY hh:mm a").toString(),
        "max": moment(starts_at).add((date_interval.minutes + (Number(formatPriority) >= 2 ? 20 : 0)) * (Number(formatPriority) - 1), "minutes").add(date_interval.hours, "hour").format("DD/MM/YYYY hh:mm a").toString()
    }
    console.log("popPriorities", obj, filterPriorities, moment(starts_at), date_interval, prioity, Number(formatPriority) - 1, filterPriorities)
    return obj
}


exports.splitArrayCount = (arr, splitOn) => {
    let fArr = []
    let splitOff = 0
    let _temp = []
    for (let i = 0; i < arr.length; i++) {
        _temp.push(arr[i])
        splitOff++
        if (splitOff === splitOn) {
            fArr.push(_temp)
            _temp = []
            splitOff = 0
        }
    }
    return fArr
}