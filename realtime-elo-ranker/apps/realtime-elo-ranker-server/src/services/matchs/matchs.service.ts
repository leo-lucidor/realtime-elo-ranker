import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class MatchsService {
    private static instance: MatchsService;
    private rankingCacheService: RankingCacheService;

    constructor() {
        this.rankingCacheService = RankingCacheService.getInstance();
    }

    public static getInstance(): MatchsService {
        if (!MatchsService.instance) {
            MatchsService.instance = new MatchsService();
        }
        return MatchsService.instance;  
    }

    public async processMatch(match: { adversaryA: string, adversaryB: string, winner: string | null, draw: boolean }): Promise<any> {
        const { adversaryA, adversaryB, winner, draw } = match;
        if (draw) {
            this.rankingCacheService.updatePlayerRank(adversaryA, 0);
            this.rankingCacheService.updatePlayerRank(adversaryB, 0);
        } else {
            this.rankingCacheService.updatePlayerRank(adversaryA, winner === adversaryA ? 50 : -50);
            this.rankingCacheService.updatePlayerRank(adversaryB, winner === adversaryB ? 50 : -50);
        }
        return { adversaryA, adversaryB, winner, draw };   
    }
}