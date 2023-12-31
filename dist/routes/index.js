"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
var checkInput_1 = __importDefault(require("../utilities/checkInput"));
var convertToNumber_1 = __importDefault(require("../utilities/convertToNumber"));
var routes = express_1.default.Router();
// resolve the path to be able to display it in the page
var output = path_1.default.resolve('src/thump/output.jpg');
// Create a cache to store processed images
var imageCache = new Map();
routes.get('/', function (req, res) {
    res.send('Welcome To Main API Page');
});
// The image processing function
routes.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, width, height, filename, _b, parsedWidth, parsedHeight, cacheKey, cachedImage, data, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, width = _a.width, height = _a.height, filename = _a.filename;
                _b = (0, convertToNumber_1.default)(width, height), parsedWidth = _b[0], parsedHeight = _b[1];
                cacheKey = "".concat(parsedWidth, "-").concat(parsedHeight, "-").concat(filename);
                if (!imageCache.has(cacheKey)) return [3 /*break*/, 1];
                cachedImage = imageCache.get(cacheKey);
                res.sendFile(cachedImage);
                return [3 /*break*/, 7];
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fs_1.promises.readFile("src/images/".concat(filename, ".jpg"))];
            case 2:
                data = _c.sent();
                if (!(0, checkInput_1.default)(parsedWidth, parsedHeight)) return [3 /*break*/, 3];
                res.send('Invlid Input Please inter positive number only');
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, imageProcessing_1.default)(data, parsedWidth, parsedHeight, output, imageCache, cacheKey)];
            case 4:
                // ImageProcessing Function
                if (_c.sent()) {
                    res.sendFile(output);
                }
                _c.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _c.sent();
                console.error(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
