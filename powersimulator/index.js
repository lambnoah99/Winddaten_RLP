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
        while (_) try {
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
exports.__esModule = true;
var mysql2_1 = require("mysql2");
var axios_1 = require("axios");
// Db Config
var connection = (0, mysql2_1.createConnection)({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'winddata'
});
var apiKey = '7ba94bce30e5d6697a151cd4b94b6325';
// Connect to DB
connection.connect();
var windparks = [];
var currentWindspeed = 60;
var windSpeeds = [
    {
        latitude: 49.93307862572027,
        longitude: 7.469163209694419,
        speed: 60
    }
];
cycle();
setInterval(cycle, 1 * 60 * 1000);
function cycle() {
    // Get Data from API
    fetchWindspeeds();
    // Get Data from DB
    getWindparks();
}
function getWindparks() {
    connection.query('SELECT id, latitude, longitude, performance FROM parks', function (err, rows) {
        if (err)
            throw err;
        rows.forEach(function (windpark) {
            windparks.push(calculate(windpark));
        });
        writeWindparks();
    });
}
function writeWindparks() {
    windparks.forEach(function (windpark) {
        connection.query('UPDATE parks SET currentPerformance = ? WHERE id = ?', [windpark.currentPerformance, windpark.id], function (err, rows) {
            if (err)
                throw err;
        });
    });
}
function calculate(windpark) {
    var multiplier = interpolate(windpark.latitude, windpark.longitude) / 10;
    windpark.currentPerformance = (((windpark.performance * multiplier) * 1000) / 365 / 24);
    return windpark;
}
function interpolate(latitude, longitude) {
    return windSpeeds
        .map(function (windspeed) { return windspeed.speed; })
        .reduce(function (previous, current) { return previous + current; });
}
function fetchWindspeeds() {
    var _this = this;
    console.log(Date.now() + " Fetching windspeed");
    windSpeeds.forEach(function (windspeed) { return __awaiter(_this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(windspeed.latitude, "&lon=").concat(windspeed.longitude, "&appid=").concat(apiKey);
            axios_1["default"].get(url)
                .then(function (response) {
                console.log("Windspeed:" + response.data.wind.speed);
                windspeed.speed = response.data.wind.speed;
            })["catch"](function (error) { return console.error(error); });
            return [2 /*return*/];
        });
    }); });
}
