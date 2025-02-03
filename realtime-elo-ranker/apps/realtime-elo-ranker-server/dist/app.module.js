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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ranking_cache_service_1 = require("./services/ranking-cache/ranking-cache.service");
const players_service_1 = require("./services/players/players.service");
const matchs_service_1 = require("./services/matchs/matchs.service");
const players_data_1 = require("./data/players.data");
const entity_player_1 = require("./entity/entity.player");
const common_2 = require("@nestjs/common");
const typeorm_3 = require("@nestjs/typeorm");
let AppModule = class AppModule {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async onModuleInit() {
        const players = players_data_1.FAKE_PLAYERS.map((name, index) => ({
            name,
            rank: 1000 + index * 10,
        }));
        await this.playerRepository.save(players);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [entity_player_1.Player],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([entity_player_1.Player]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [ranking_cache_service_1.RankingCacheService, players_service_1.PlayersService, matchs_service_1.MatchsService],
    }),
    __param(0, InjectRepository(entity_player_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppModule);
function InjectRepository(entity) {
    return (0, common_2.Inject)((0, typeorm_3.getRepositoryToken)(entity));
}
//# sourceMappingURL=app.module.js.map