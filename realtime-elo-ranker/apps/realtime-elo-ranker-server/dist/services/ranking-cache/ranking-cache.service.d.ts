export declare class RankingCacheService {
    private cache;
    set(key: string, value: any): void;
    get(key: string): any | undefined;
    clear(): void;
}
