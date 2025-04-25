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
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var storage_1 = require("./storage");
var uuid_1 = require("uuid");
var schema_1 = require("@shared/schema");
var chatbotLogic_1 = require("../shared/chatbotLogic");
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var apiRouter, httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            apiRouter = app.route('/api');
            // Chat messages routes
            app.get('/api/chat/:sessionId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var sessionId, messages, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sessionId = req.params.sessionId;
                            return [4 /*yield*/, storage_1.storage.getChatMessagesBySessionId(sessionId)];
                        case 1:
                            messages = _a.sent();
                            res.json(messages);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            res.status(500).json({ message: 'Error al obtener mensajes', error: error_1 });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post('/api/chat', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var parsed, userMessage, botResponse, quickReplies, botMessage, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            parsed = schema_1.insertChatMessageSchema.safeParse(req.body);
                            if (!parsed.success) {
                                return [2 /*return*/, res.status(400).json({ message: 'Datos inválidos', errors: parsed.error })];
                            }
                            return [4 /*yield*/, storage_1.storage.createChatMessage(parsed.data)];
                        case 1:
                            userMessage = _a.sent();
                            botResponse = (0, chatbotLogic_1.getChatbotResponse)(parsed.data.content);
                            quickReplies = (0, chatbotLogic_1.getQuickReplySuggestions)(botResponse);
                            return [4 /*yield*/, storage_1.storage.createChatMessage({
                                    sessionId: parsed.data.sessionId,
                                    content: botResponse,
                                    sender: 'bot'
                                })];
                        case 2:
                            botMessage = _a.sent();
                            res.json({
                                userMessage: userMessage,
                                botMessage: botMessage,
                                quickReplies: quickReplies
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            res.status(500).json({ message: 'Error al procesar el mensaje', error: error_2 });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // Session initialization
            app.get('/api/session/new', function (req, res) {
                var sessionId = (0, uuid_1.v4)();
                var welcomeMessage = "¡Hola! Soy tu asistente contra el bullying. Estoy aquí para escucharte, ayudarte y brindarte recursos útiles. ¿En qué puedo ayudarte hoy?";
                var quickReplies = [
                    "¿Qué es el bullying?",
                    "Estoy sufriendo bullying",
                    "Quiero ayudar a un amigo",
                    "Soy testigo de bullying",
                    "¿Cómo prevengo el bullying?"
                ];
                res.json({
                    sessionId: sessionId,
                    welcomeMessage: welcomeMessage,
                    quickReplies: quickReplies
                });
            });
            // Reports routes
            app.post('/api/reports', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var parsed, report, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            parsed = schema_1.insertReportSchema.safeParse(req.body);
                            if (!parsed.success) {
                                return [2 /*return*/, res.status(400).json({ message: 'Datos inválidos', errors: parsed.error })];
                            }
                            return [4 /*yield*/, storage_1.storage.createReport(parsed.data)];
                        case 1:
                            report = _a.sent();
                            res.status(201).json(report);
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            res.status(500).json({ message: 'Error al crear el reporte', error: error_3 });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get('/api/reports', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var reports, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getAllReports()];
                        case 1:
                            reports = _a.sent();
                            res.json(reports);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            res.status(500).json({ message: 'Error al obtener reportes', error: error_4 });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = (0, http_1.createServer)(app);
            return [2 /*return*/, httpServer];
        });
    });
}
