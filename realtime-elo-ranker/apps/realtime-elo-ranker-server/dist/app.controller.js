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
let AppController = class AppController {
    constructor(rankingCacheService, playersService, matchService) {
        this.rankingCacheService = rankingCacheService;
        this.playersService = playersService;
        this.matchService = matchService;
    }
    getHome() {
        return this.playersService.getPlayers().toString();
    }
    postPlayer(res, body) {
        let { id } = body;
        this.playersService.addPlayer(id);
        res.status(200).send(id);
    }
    async getRanking() {
        const rankingData = await this.rankingCacheService.getRankingData();
        return JSON.stringify(rankingData);
    }
    async getRankingEvent(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        const sendRankingUpdate = async () => {
            const players = await this.playersService.getPlayers();
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            const newRank = randomPlayer.rank + Math.floor(Math.random() * 10) - 5;
            await this.rankingCacheService.updatePlayerRank(randomPlayer.name, newRank);
            res.write("event: message\n" + "data: " + JSON.stringify({
                type: "RankingUpdate",
                player: {
                    id: randomPlayer.name,
                    name: randomPlayer.name,
                    rank: newRank,
                }
            }) + '\n\n');
        };
        const intervalId = setInterval(sendRankingUpdate, 500);
        res.on('close', () => {
            clearInterval(intervalId);
            res.end();
        });
    }
    async postMatch(res, body) {
        if (body.adversaryA === "" || body.adversaryB === "") {
            res.status(400).send("Adversary names cannot be empty");
            return;
        }
        if (body.adversaryA === body.adversaryB) {
            res.status(400).send("Adversaries must be different");
            return;
        }
        else {
            const result = await this.matchService.processMatch(body);
            res.status(200).send(result);
        }
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
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('/api/ranking/events'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
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
    __metadata("design:paramtypes", [ranking_cache_service_1.RankingCacheService,
        players_service_1.PlayersService,
        matchs_service_1.MatchsService])
], AppController);
//# sourceMappingURL=app.controller.js.map