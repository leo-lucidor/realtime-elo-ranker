import { Injectable, Scope } from '@nestjs/common';
import { FAKE_PLAYERS } from '../../data/players.data';

@Injectable({ scope: Scope.DEFAULT })
export class RankingCacheService {
    private static instance: RankingCacheService;
    private cache: Map<string, any> = new Map();

    public static getInstance(): RankingCacheService {
        if (!RankingCacheService.instance) {
            RankingCacheService.instance = new RankingCacheService();
        }
        return RankingCacheService.instance;
    }

    constructor() {
        if (RankingCacheService.instance) {
            throw new Error("Error: Instantiation failed: Use RankingCacheService.getInstance() instead of new.");
        }
        RankingCacheService.instance = this;
    }

    set(key: string, value: any): void {
        this.cache.set(key, value);
    }

    get(key: string): any | undefined {
        return this.cache.get(key);
    }

    clear(): void {
        this.cache.clear();
    }

    getRanks(): { id: string, rank: number }[] {
        const fakeRanking = FAKE_PLAYERS.map((player, index) => ({
            id: player,
            rank: 1000 + index * 10
        })).sort((a, b) => b.rank - a.rank);
        return fakeRanking;
    }

}