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

    async processMatch(match: { adversaryA: string, adversaryB: string, winner: string | null, draw: boolean }): Promise<any> {
        
    }
}