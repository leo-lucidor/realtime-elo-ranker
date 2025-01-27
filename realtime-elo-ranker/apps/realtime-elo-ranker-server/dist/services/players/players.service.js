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
var PlayersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const players_data_1 = require("../../data/players.data");
let PlayersService = PlayersService_1 = class PlayersService {
    static getInstance() {
        if (!PlayersService_1.instance) {
            PlayersService_1.instance = new PlayersService_1();
        }
        return PlayersService_1.instance;
    }
    constructor() {
        this.cache = new Map();
        if (PlayersService_1.instance) {
            throw new Error("Error: Instantiation failed: Use PlayersService.getInstance() instead of new.");
        }
        PlayersService_1.instance = this;
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
    getPlayers() {
        return players_data_1.FAKE_PLAYERS;
    }
    addPlayer(id) {
        if (!players_data_1.FAKE_PLAYERS.includes(id)) {
            players_data_1.FAKE_PLAYERS.push(id);
        }
        return { id, rank: 1000 };
    }
    updatePlayer(id, rank) {
        if (players_data_1.FAKE_PLAYERS.includes(id)) {
            this.cache.set(id, rank);
        }
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = PlayersService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [])
], PlayersService);
//# sourceMappingURL=players.service.js.map