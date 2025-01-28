import { Injectable, Scope } from '@nestjs/common';
import { FAKE_PLAYERS } from '../../data/players.data';

@Injectable({ scope: Scope.DEFAULT })
export class RankingCacheService {
    private static instance: RankingCacheService;
    private cache: Map<string, any> = new Map();

    constructor() {
        this.cache = new Map();
        const fakeRanking = FAKE_PLAYERS.map((player, index) => ({
        id: player,
        rank: 1000 + index * 10
        })).sort((a, b) => b.rank - a.rank);
        this.cache.set('ranking', fakeRanking);
    }

    public static getInstance(): RankingCacheService {
        if (!RankingCacheService.instance) {
            RankingCacheService.instance = new RankingCacheService();
        }
        return RankingCacheService.instance;
    }

    public setRankingData(key: string, data: any): void {
        const ranking = this.cache.get("ranking") || [];
        ranking.push({id : key, rank : data})
        this.cache.set("ranking", ranking);
    }

    public pushPlayerData(playerData: { id: string; rank: number; }): void {
        const ranking = this.cache.get("ranking") || [];
        ranking.push(playerData);
        this.cache.set("ranking", ranking);
    }

    public getCache(): Map<string, any> {
        return this.cache;
    }
    
    public getRankingData(key: string): any | undefined {
        return this.cache.get(key);
    }
    
    public getId(key: string): any | undefined {
        const ranking = this.cache.get("ranking") || [];
        for (const playerData of ranking) {
            if (playerData.id === key) {
                return playerData.id;
            }
        }
        return undefined;
    }
    
    public getRank(key: string): any | undefined {
        const ranking = this.cache.get("ranking") || [];
        for (const playerData of ranking) {
            if (playerData.id === key) {
                return playerData.rank;
            }
        }
        return undefined;
    }

    public getAverageRanking(): number {
        const ranking = this.cache.get('ranking') || [];
        if (ranking.length === 0) {
            return 0;
        }
        const total = ranking.reduce((acc: any, player: { rank: any; }) => acc + player.rank, 0);
        return total / ranking.length;
    }

}