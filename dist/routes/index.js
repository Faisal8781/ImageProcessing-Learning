"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var lodash_1 = require("lodash");
var routes = express_1.default.Router();
// resolve the path to be able to display it in the page
var output = path_1.default.resolve('src/thump/output.jpg');
// Create a cache to store processed images
var imageCache = new Map();
routes.get('/', function (req, res) {
    res.send('Welcome To Main API Page');
});
// The image processing function
routes.get('/images', function (req, res) {
    var _a = req.query, width = _a.width, height = _a.height, filename = _a.filename;
    // Convert width and height to numbers
    var parsedWidth = parseInt(width);
    var parsedHeight = parseInt(height);
    var cacheKey = "".concat(width, "-").concat(height, "-").concat(filename);
    // Check if the processed image is already in the cache
    if (imageCache.has(cacheKey)) {
        var cachedImage = imageCache.get(cacheKey);
        res.sendFile(cachedImage);
        return;
    }
    // Image Processing Function
    try {
        fs_1.default.readFile("src/images/".concat(filename, ".jpg"), function (err, data) {
            // Generate Error and display it if there are non positive number
            if (parsedWidth < 0 ||
                parsedHeight < 0 ||
                !(0, lodash_1.isInteger)(parsedHeight) ||
                !(0, lodash_1.isInteger)(parsedWidth)) {
                res.send('Invlid Input Please inter positive number only');
            }
            else {
                if (err) {
                    console.error(err);
                }
                else {
                    (0, sharp_1.default)(data)
                        .resize(parsedWidth, parsedHeight)
                        .toFile(output, function (err, info) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            // Store the processed image in the cache
                            imageCache.set(cacheKey, output);
                            res.sendFile(output);
                        }
                    });
                }
            }
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = routes;
