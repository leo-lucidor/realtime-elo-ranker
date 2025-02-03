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
exports.RankingCacheService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_player_1 = require("../../entity/entity.player");
let RankingCacheService = class RankingCacheService {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async setRankingData(name, rank) {
        const player = await this.playerRepository.findOne({ where: { name } });
        if (player) {
            player.rank = rank;
            await this.playerRepository.save(player);
        }
        else {
            const newPlayer = this.playerRepository.create({ name, rank });
            await this.playerRepository.save(newPlayer);
        }
    }
    async pushPlayerData(playerData) {
        const player = await this.playerRepository.findOne({ where: { name: playerData.name } });
        if (player) {
            player.rank = playerData.rank;
            await this.playerRepository.save(player);
        }
        else {
            const newPlayer = this.playerRepository.create(playerData);
            await this.playerRepository.save(newPlayer);
        }
    }
    async getRankingData() {
        return await this.playerRepository.find({ order: { rank: 'DESC' } });
    }
    async getId(name) {
        const player = await this.playerRepository.findOne({ where: { name } });
        return player ? player.id : undefined;
    }
    async getRank(name) {
        const player = await this.playerRepository.findOne({ where: { name } });
        return player ? player.rank : undefined;
    }
    async getAverageRanking() {
        const players = await this.playerRepository.find();
        if (players.length === 0) {
            return 0;
        }
        const total = players.reduce((acc, player) => acc + player.rank, 0);
        return total / players.length;
    }
    async updatePlayerRank(name, rankChange) {
        const player = await this.playerRepository.findOne({ where: { name } });
        if (player) {
            player.rank += rankChange;
            await this.playerRepository.save(player);
        }
    }
};
exports.RankingCacheService = RankingCacheService;
exports.RankingCacheService = RankingCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_player_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RankingCacheService);
//# sourceMappingURL=ranking-cache.service.js.map