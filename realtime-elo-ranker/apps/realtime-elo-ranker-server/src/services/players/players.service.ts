import { Injectable, Scope } from '@nestjs/common';
import { FAKE_PLAYERS } from 'src/data/players.data';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable({ scope: Scope.DEFAULT })
export class PlayersService {
    private static instance: PlayersService;
    private rankingCacheService: RankingCacheService;

    constructor() {
        this.rankingCacheService = RankingCacheService.getInstance();
    }

    public static getInstance(): PlayersService {
        if (!PlayersService.instance) {
            PlayersService.instance = new PlayersService();
        }
        return PlayersService.instance;
    }

    public addPlayer(id: string): boolean | undefined {
        if (this.rankingCacheService.getId(id)) {
            console.log(`Player with id ${id} already exists`);
            return false;
        } 
        let rank = this.rankingCacheService.getAverageRanking();
        console.log(`Adding player with id ${id} and rank ${rank}`);
        this.rankingCacheService.pushPlayerData({id, rank});
        return true;
    }

    updatePlayer(id: string, rank: number): void {
        this.rankingCacheService.setRankingData(id, rank);
    }

    getPlayers(): string[] {
        const ranking = this.rankingCacheService.getRankingData("ranking") || [];
        return ranking.map((player: { id: string; }) => player.id);
    }
}