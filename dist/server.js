"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("./config"));
var constants_1 = require("./config/constants");
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.listen(config_1["default"].PORT, function () {
    console.log("Listening on: ".concat(constants_1.ADDRESS));
});
