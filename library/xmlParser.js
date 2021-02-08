const DOMParser = require("xmldom").DOMParser
const xmlJS = require("xml-js");

/* 
*   using xmldom to read xml file
*   @param {String} str
*/
const read_xml = (str, type = "text/xml") => {
    const parser = new DOMParser()
    return parser.parseFromString(str, type);
}

/* 
*   RemoveJsonTextAttribute
*   to remove _text JSON Object
*/
const RemoveJsonTextAttribute = (value, parentElement) => {
    try {
        var keyNo = Object.keys(parentElement._parent).length;
        var keyName = Object.keys(parentElement._parent)[keyNo - 1];
        parentElement._parent[keyName] = value;
    } catch (e) { }
}

/*
*   using xml-js to convert xml to json
*   using xml-js to convert json to xml
*   xml-js options
*       compact: true, ignoreDeclaration: true
*       compact: true, space: 4
*/
const xmlToJson = (doc) => xmlJS.xml2json(doc, { compact: true, ignoreDeclaration: true, textFn: RemoveJsonTextAttribute })
const jsonToXml = (json) => xmlJS.json2xml(json, { compact: true, space: 4 })

/*
*   removeFromObject
*   using this to remove Objects from JSON
*/
const removeFromObject = (obj, keys = []) => {
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

/*
*   removeItemOnce
*   using this to remove Object from JSON
*/
const removeItemOnce = (arr, value) => {
    for (val of value) {
        let index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
        }
        arr = arr
    }
    return arr;
}

/*
*   getAge
*   using this to calculate age from date of birth
*/
const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear(); var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = {
    read_xml, xmlToJson, jsonToXml, removeFromObject, removeItemOnce, getAge
}