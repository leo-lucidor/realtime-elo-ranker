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
const matchs_service_1 = require("./services/matchs/matchs.service");
const common_1 = require("@nestjs/common");
const players_data_1 = require("./data/players.data");
let AppController = class AppController {
    constructor() {
        this.playersService = players_service_1.PlayersService.getInstance();
        this.rankingCacheService = ranking_cache_service_1.RankingCacheService.getInstance();
        this.matchService = matchs_service_1.MatchsService.getInstance();
    }
    getHome() {
        return players_service_1.PlayersService.getInstance().getPlayers().toString();
    }
    postPlayer(res, body) {
        const { id } = body;
        console.log(`Received player: id=${id}`);
        this.playersService.addPlayer(id);
        res.status(200).send(id);
    }
    getRanking() {
        return this.rankingCacheService.getRankingData("ranking");
    }
    getRankingEvent(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        setInterval(() => {
            res.write("event: message\n" + "data: " + JSON.stringify({
                type: "RankingUpdate",
                player: {
                    id: players_data_1.FAKE_PLAYERS[Math.floor(Math.random() * players_data_1.FAKE_PLAYERS.length)],
                    rank: Math.floor(Math.random() * 2500)
                }
            }) + '\n\n');
        }, 500);
    }
    async postMatch(res, body) {
        const matchService = this.matchService;
        const { adversaryA, adversaryB, winner, draw } = body;
        console.log(`Received match: adversaryA=${adversaryA}, adversaryB=${adversaryB}, winner=${winner}, draw=${draw}`);
        if (!adversaryA || !adversaryB) {
            console.error('adversaryA or adversaryB is undefined');
            res.status(400).send('Invalid request: adversaryA or adversaryB is undefined');
            return;
        }
        const result = await matchService.processMatch({ adversaryA, adversaryB, winner, draw });
        res.status(200).send(result);
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
    (0, common_1.Post)("/api/player"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "postPlayer", null);
__decorate([
    (0, common_1.Get)("/api/ranking/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('/api/ranking/events'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRankingEvent", null);
__decorate([
    (0, common_1.Post)("/api/match"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postMatch", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], AppController);
//# sourceMappingURL=app.controller.js.map