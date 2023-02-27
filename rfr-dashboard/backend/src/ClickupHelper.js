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
exports.__esModule = true;
exports.ClickupHelper = void 0;
var Logger_1 = require("./Logger");
var ClickupHelper = /** @class */ (function () {
    function ClickupHelper(apiKey) {
        this.workspaceId = "";
        this.spaceId = "";
        this.folderlessListIDs = [];
        this.logger = new Logger_1.RFRLogger();
        this.apiKey = apiKey;
    }
    ClickupHelper.prototype.getTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log("API Call Requested");
                        return [4 /*yield*/, this.getAllTasks()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClickupHelper.prototype.getAllTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lists, allTasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.folderlessListIDs.length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getFolderlessLists()];
                    case 1:
                        lists = _a.sent();
                        this.logger.log("lists ".concat(JSON.stringify(lists)));
                        this.folderlessListIDs = lists.lists.map(function (list) { return list.id; });
                        this.logger.log("folderlessListID's ".concat(this.folderlessListIDs, " retrieved"));
                        _a.label = 2;
                    case 2:
                        allTasks = [];
                        return [4 /*yield*/, Promise.all(this.folderlessListIDs.map(function (listId) { return __awaiter(_this, void 0, void 0, function () {
                                var response, message, json;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fetch("https://api.clickup.com/api/v2/list/".concat(listId, "/task?subtasks=true"), {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    Authorization: 'pk_57143560_TQOB8ZNCNW2EFCPG3A32RSU2DUPHRLCY'
                                                }
                                            })];
                                        case 1:
                                            response = _a.sent();
                                            this.logger.log("getRollingChassisList(): " + response.status + " " + response.statusText);
                                            if (response.status !== 200) {
                                                message = response.json();
                                                this.logger.log("Error: " + message);
                                            }
                                            return [4 /*yield*/, response.json()];
                                        case 2:
                                            json = _a.sent();
                                            allTasks = allTasks.concat(json.tasks);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, allTasks];
                }
            });
        });
    };
    ClickupHelper.prototype.getFolderlessLists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spaces, response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.spaceId === "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getSpaces()];
                    case 1:
                        spaces = _a.sent();
                        this.logger.log("spaces ".concat(JSON.stringify(spaces)));
                        this.spaceId = spaces.spaces[1].id;
                        this.logger.log("spaceId ".concat(this.spaceId, " retrieved"));
                        _a.label = 2;
                    case 2: return [4 /*yield*/, fetch("https://api.clickup.com/api/v2/space/".concat(this.spaceId, "/list"), {
                            method: 'GET',
                            headers: {
                                Authorization: this.apiKey
                            }
                        })];
                    case 3:
                        response = _a.sent();
                        this.logger.log("getFolders(): " + response.status + " " + response.statusText);
                        if (!(response.status !== 200)) return [3 /*break*/, 5];
                        return [4 /*yield*/, response.json()];
                    case 4:
                        message = _a.sent();
                        this.logger.log("Error: " + message);
                        return [2 /*return*/, 'Error: Check the logs for more details.'];
                    case 5: return [2 /*return*/, response.json()];
                }
            });
        });
    };
    ClickupHelper.prototype.getSpaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var workspaces, response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.workspaceId === "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getWorkspaces()];
                    case 1:
                        workspaces = _a.sent();
                        this.logger.log("workspaces ".concat(JSON.stringify(workspaces)));
                        this.workspaceId = workspaces.teams[1].id;
                        this.logger.log("workspaceId ".concat(this.workspaceId, " retrieved"));
                        _a.label = 2;
                    case 2: return [4 /*yield*/, fetch("https://api.clickup.com/api/v2/team/".concat(this.workspaceId, "/space"), {
                            method: 'GET',
                            headers: {
                                Authorization: this.apiKey
                            }
                        })];
                    case 3:
                        response = _a.sent();
                        this.logger.log("getSpaces(): " + response.status + " " + response.statusText);
                        if (!(response.status !== 200)) return [3 /*break*/, 5];
                        return [4 /*yield*/, response.json()];
                    case 4:
                        message = _a.sent();
                        this.logger.log("Error: " + message);
                        return [2 /*return*/, 'Error: Check the logs for more details.'];
                    case 5: return [2 /*return*/, response.json()];
                }
            });
        });
    };
    ClickupHelper.prototype.getWorkspaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://api.clickup.com/api/v2/team', {
                            method: 'GET',
                            headers: {
                                Authorization: this.apiKey
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        this.logger.log("getWorkspaces(): " + response.status + " " + response.statusText);
                        if (!(response.status !== 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        message = _a.sent();
                        this.logger.log("Error: " + message);
                        return [2 /*return*/, 'Error: Check the logs for more details.'];
                    case 3: return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return ClickupHelper;
}());
exports.ClickupHelper = ClickupHelper;
