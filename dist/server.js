"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const constants_1 = require("./config/constants");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.listen(config_1.default.PORT, function () {
    console.log(`Listening on: ${constants_1.ADDRESS}`);
});
