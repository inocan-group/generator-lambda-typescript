"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutDatabase = exports.DbTech = void 0;
const private_1 = require("../private");
var DbTech;
(function (DbTech) {
    DbTech["rtdb"] = "firebase:real-time-database";
    DbTech["firestore"] = "firebase:firestore-database";
    DbTech["dynamodb"] = "dynamodb";
    DbTech["other"] = "Other / None";
})(DbTech = exports.DbTech || (exports.DbTech = {}));
function askAboutDatabase(defaults) {
    return private_1.listQuestion({
        name: "database",
        message: "What database technology will you use (as your primary source):",
        choices: [DbTech.rtdb, DbTech.firestore, DbTech.dynamodb, DbTech.other],
        default: defaults.database || DbTech.rtdb,
        when: !defaults.database,
    });
}
exports.askAboutDatabase = askAboutDatabase;
