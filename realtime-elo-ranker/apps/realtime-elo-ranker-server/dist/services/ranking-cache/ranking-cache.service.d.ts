export declare class RankingCacheService {
    private static instance;
    private cache;
    static getInstance(): RankingCacheService;
    constructor();
    set(key: string, value: any): void;
    get(key: string): any | undefined;
    clear(): void;
    getRanks(): {
        id: string;
        rank: number;
    }[];
}
