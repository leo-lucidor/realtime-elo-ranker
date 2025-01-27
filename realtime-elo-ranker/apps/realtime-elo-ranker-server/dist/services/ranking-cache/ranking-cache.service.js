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
var RankingCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingCacheService = void 0;
const common_1 = require("@nestjs/common");
const players_data_1 = require("../../data/players.data");
let RankingCacheService = RankingCacheService_1 = class RankingCacheService {
    static getInstance() {
        if (!RankingCacheService_1.instance) {
            RankingCacheService_1.instance = new RankingCacheService_1();
        }
        return RankingCacheService_1.instance;
    }
    constructor() {
        this.cache = new Map();
        if (RankingCacheService_1.instance) {
            throw new Error("Error: Instantiation failed: Use RankingCacheService.getInstance() instead of new.");
        }
        RankingCacheService_1.instance = this;
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key);
    }
    clear() {
        this.cache.clear();
    }
    getRanks() {
        const fakeRanking = players_data_1.FAKE_PLAYERS.map((player, index) => ({
            id: player,
            rank: 1000 + index * 10
        })).sort((a, b) => b.rank - a.rank);
        return fakeRanking;
    }
};
exports.RankingCacheService = RankingCacheService;
exports.RankingCacheService = RankingCacheService = RankingCacheService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [])
], RankingCacheService);
//# sourceMappingURL=ranking-cache.service.js.map