"use strict";
exports.__esModule = true;
exports.RFRLogger = void 0;
var winston_1 = require("winston");
// Set to true to write to file to debug issues
var writeToFile = false;
var RFRLogger = /** @class */ (function () {
    function RFRLogger() {
        var myFormat = winston_1.format.printf(function (_a) {
            var level = _a.level, message = _a.message, timestamp = _a.timestamp;
            return "".concat(timestamp, " ").concat(level, ": ").concat(message);
        });
        var filename = "./logs/combinedlog.log";
        console.log(filename);
        this.logger = (0, winston_1.createLogger)({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.label({ label: '[message]', message: true }), winston_1.format.timestamp(), myFormat),
            defaultMeta: { service: 'user-service' },
            transports: writeToFile ? [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: filename })
            ] :
                [
                    new winston_1.transports.Console()
                ]
        });
        this.logger.info('Logger initialized');
    }
    RFRLogger.prototype.log = function (message) {
        this.logger.info(message);
    };
    return RFRLogger;
}());
exports.RFRLogger = RFRLogger;
