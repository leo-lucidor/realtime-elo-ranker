export declare class RankingCacheService {
    private static instance;
    private cache;
    constructor();
    static getInstance(): RankingCacheService;
    setRankingData(key: string, data: any): void;
    pushPlayerData(playerData: {
        id: string;
        rank: number;
    }): void;
    getCache(): Map<string, any>;
    getRankingData(key: string): any | undefined;
    getId(key: string): any | undefined;
    getRank(key: string): any | undefined;
    getAverageRanking(): number;
}
