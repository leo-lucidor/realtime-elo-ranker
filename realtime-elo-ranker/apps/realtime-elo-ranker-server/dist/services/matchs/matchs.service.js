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
let MatchsService = MatchsService_1 = class MatchsService {
    constructor() {
        this.rankingCacheService = ranking_cache_service_1.RankingCacheService.getInstance();
    }
    static getInstance() {
        if (!MatchsService_1.instance) {
            MatchsService_1.instance = new MatchsService_1();
        }
        return MatchsService_1.instance;
    }
    async processMatch(match) {
        const { adversaryA, adversaryB, winner, draw } = match;
        if (draw) {
            this.rankingCacheService.updatePlayerRank(adversaryA, 0);
            this.rankingCacheService.updatePlayerRank(adversaryB, 0);
        }
        else {
            this.rankingCacheService.updatePlayerRank(adversaryA, winner === adversaryA ? 50 : -50);
            this.rankingCacheService.updatePlayerRank(adversaryB, winner === adversaryB ? 50 : -50);
        }
        return { adversaryA, adversaryB, winner, draw };
    }
};
exports.MatchsService = MatchsService;
exports.MatchsService = MatchsService = MatchsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MatchsService);
//# sourceMappingURL=matchs.service.js.map