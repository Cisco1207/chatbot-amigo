"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
var MemStorage = /** @class */ (function () {
    function MemStorage() {
        this.users = new Map();
        this.chatMessages = new Map();
        this.reports = new Map();
        this.userCurrentId = 1;
        this.chatMessageCurrentId = 1;
        this.reportCurrentId = 1;
    }
    // User methods
    MemStorage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.users.get(id)];
            });
        });
    };
    MemStorage.prototype.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.users.values()).find(function (user) { return user.username === username; })];
            });
        });
    };
    MemStorage.prototype.createUser = function (insertUser) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                id = this.userCurrentId++;
                user = __assign(__assign({}, insertUser), { id: id });
                this.users.set(id, user);
                return [2 /*return*/, user];
            });
        });
    };
    // Chat methods
    MemStorage.prototype.getChatMessagesBySessionId = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.chatMessages.values())
                        .filter(function (message) { return message.sessionId === sessionId; })
                        .sort(function (a, b) {
                        if (a.timestamp && b.timestamp) {
                            return a.timestamp.getTime() - b.timestamp.getTime();
                        }
                        return 0;
                    })];
            });
        });
    };
    MemStorage.prototype.createChatMessage = function (insertMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var id, timestamp, message;
            return __generator(this, function (_a) {
                id = this.chatMessageCurrentId++;
                timestamp = new Date();
                message = __assign(__assign({}, insertMessage), { id: id, timestamp: timestamp });
                this.chatMessages.set(id, message);
                return [2 /*return*/, message];
            });
        });
    };
    // Report methods
    MemStorage.prototype.getAllReports = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.reports.values())
                        .sort(function (a, b) {
                        if (a.timestamp && b.timestamp) {
                            return b.timestamp.getTime() - a.timestamp.getTime();
                        }
                        return 0;
                    })];
            });
        });
    };
    MemStorage.prototype.getReportById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.reports.get(id)];
            });
        });
    };
    MemStorage.prototype.createReport = function (insertReport) {
        return __awaiter(this, void 0, void 0, function () {
            var id, timestamp, report;
            var _a;
            return __generator(this, function (_b) {
                id = this.reportCurrentId++;
                timestamp = new Date();
                report = {
                    id: id,
                    timestamp: timestamp,
                    reportType: insertReport.reportType,
                    location: insertReport.location,
                    description: insertReport.description,
                    name: (_a = insertReport.name) !== null && _a !== void 0 ? _a : null
                };
                this.reports.set(id, report);
                return [2 /*return*/, report];
            });
        });
    };
    return MemStorage;
}());
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
