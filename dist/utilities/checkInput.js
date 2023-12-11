"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Check and verfied it's number
function CheckNumber(width, height) {
    return width < 0 || height < 0 || !(0, lodash_1.isInteger)(height) || !(0, lodash_1.isInteger)(width);
}
exports.default = CheckNumber;
