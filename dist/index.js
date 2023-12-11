"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var debug_1 = require("debug");
var app = (0, express_1.default)();
exports.app = app;
var port = 3000;
// Main Route
app.get('/', function (req, res) {
    res.send('Hello There');
});
// Start API Route to api folder
app.use('/api', index_1.default);
app.listen(port, function () {
    (0, debug_1.log)("Listening on port http://localhost:".concat(port));
});
