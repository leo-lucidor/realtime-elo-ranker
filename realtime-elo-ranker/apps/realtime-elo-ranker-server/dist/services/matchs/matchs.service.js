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
exports.MatchsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_player_1 = require("../../entity/entity.player");
let MatchsService = class MatchsService {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async processMatch(match) {
        const { adversaryA, adversaryB, winner, draw } = match;
        const playerA = await this.playerRepository.findOne({ where: { name: adversaryA } });
        const playerB = await this.playerRepository.findOne({ where: { name: adversaryB } });
        if (!playerA || !playerB) {
            throw new Error(`One of the players does not exist`);
        }
        const playerARank = playerA.rank;
        const playerBRank = playerB.rank;
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
        playerA.rank = scoreAUpdated;
        playerB.rank = scoreBUpdated;
        await this.playerRepository.save(playerA);
        await this.playerRepository.save(playerB);
        return result;
    }
};
exports.MatchsService = MatchsService;
exports.MatchsService = MatchsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_player_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MatchsService);
//# sourceMappingURL=matchs.service.js.map