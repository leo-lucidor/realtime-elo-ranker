"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const ranking_cache_service_1 = require("./services/ranking-cache/ranking-cache.service");
const players_service_1 = require("./services/players/players.service");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor() {
        this.playersService = players_service_1.PlayersService.getInstance();
        this.rankingCacheService = ranking_cache_service_1.RankingCacheService.getInstance();
    }
    getHome() {
        return players_service_1.PlayersService.getInstance().getPlayers().toString();
    }
    getRanking() {
        return this.rankingCacheService.getRanks();
    }
    getPlayers() {
        return this.playersService.getPlayers();
    }
    getPlayersEvent() {
        return this.playersService.addPlayer("test").id;
    }
    subscribeRankingEvents(res, req) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '');
        const sendRankingUpdate = () => {
            const players = this.playersService.getPlayers();
            const randomPlayer = players[Math.floor(Math.random(), players.length)];
            const data = {
                type: "RankingUpdate",
                player: randomPlayer
            };
            res.write(event, message, n);
            res.write(data, $, { JSON, : .stringify(data) }, n, n);
        };
        const interval = setInterval(sendRankingUpdate, 500);
        req.on('close', () => {
            clearInterval(interval);
            res.end();
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)("/api/ranking"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)("/api/players"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Get)("/api/players/events"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getPlayersEvent", null);
__decorate([
    (0, common_1.Get)('/api/ranking/events'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Request]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "subscribeRankingEvents", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], AppController);
//# sourceMappingURL=app.controller.js.map