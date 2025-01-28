export declare class MatchsService {
    private static instance;
    private rankingCacheService;
    constructor();
    static getInstance(): MatchsService;
    processMatch(match: {
        adversaryA: string;
        adversaryB: string;
        winner: string | null;
        draw: boolean;
    }): Promise<any>;
}
