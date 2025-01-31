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
var MatchsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchsService = void 0;
const common_1 = require("@nestjs/common");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
const players_service_1 = require("../players/players.service");
let MatchsService = MatchsService_1 = class MatchsService {
    constructor() {
        this.rankingCacheService = ranking_cache_service_1.RankingCacheService.getInstance();
        this.playersService = players_service_1.PlayersService.getInstance();
    }
    static getInstance() {
        if (!MatchsService_1.instance) {
            MatchsService_1.instance = new MatchsService_1();
        }
        return MatchsService_1.instance;
    }
    async processMatch(match) {
        const { adversaryA, adversaryB, winner, draw } = match;
        if (!this.rankingCacheService.getId(adversaryA) || !this.rankingCacheService.getId(adversaryB)) {
            throw new Error(`One of the players does not exist`);
        }
        const playerARank = this.playersService.getRankPlayer(adversaryA);
        const playerBRank = this.playersService.getRankPlayer(adversaryB);
        const K = 32;
        const weA = 1 / (1 + Math.pow(10, (playerBRank - playerARank) / 400));
        const weB = 1 / (1 + Math.pow(10, (playerARank - playerBRank) / 400));
        let scoreA = 0.5;
        let scoreB = 0.5;
        let result = "Match nul";
        if (!draw) {
            if (winner === adversaryA) {
                scoreA = 1;
                scoreB = 0;
                result = `${adversaryA} gagne`;
            }
            else if (winner === adversaryB) {
                scoreA = 0;
                scoreB = 1;
                result = `${adversaryB} gagne`;
            }
            else {
                throw new Error(`Winner must be one of the players`);
            }
        }
        const scoreAUpdated = Math.round(playerARank + K * (scoreA - weA));
        const scoreBUpdated = Math.round(playerBRank + K * (scoreB - weB));
        this.rankingCacheService.updatePlayerRank(adversaryA, scoreAUpdated);
        this.rankingCacheService.updatePlayerRank(adversaryB, scoreBUpdated);
        return result;
    }
};
exports.MatchsService = MatchsService;
exports.MatchsService = MatchsService = MatchsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MatchsService);
//# sourceMappingURL=matchs.service.js.map