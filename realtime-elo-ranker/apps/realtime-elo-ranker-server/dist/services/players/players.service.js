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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_player_1 = require("../../entity/entity.player");
let PlayersService = class PlayersService {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async addPlayer(name) {
        const existingPlayer = await this.playerRepository.findOne({ where: { name } });
        if (existingPlayer) {
            console.log(`Player with name ${name} already exists`);
            return existingPlayer;
        }
        const rank = await this.getAverageRanking();
        const newPlayer = this.playerRepository.create({ name, rank });
        return this.playerRepository.save(newPlayer);
    }
    async updatePlayer(id, rank) {
        await this.playerRepository.update(id, { rank });
    }
    async getPlayers() {
        return this.playerRepository.find();
    }
    async getPlayer(id) {
        const player = await this.playerRepository.findOne({ where: { id } });
        if (!player) {
            throw new Error(`Player with id ${id} not found`);
        }
        return player;
    }
    async getRankPlayer(id) {
        const player = await this.playerRepository.findOne({ where: { id } });
        if (!player) {
            throw new Error(`Player with id ${id} not found`);
        }
        return player.rank;
    }
    async getAverageRanking() {
        const players = await this.playerRepository.find();
        if (players.length === 0) {
            return 1000;
        }
        const totalRank = players.reduce((acc, player) => acc + player.rank, 0);
        return totalRank / players.length;
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_player_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlayersService);
//# sourceMappingURL=players.service.js.map