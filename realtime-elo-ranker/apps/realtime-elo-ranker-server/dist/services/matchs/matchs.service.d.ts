export declare class MatchsService {
    private static instance;
    private rankingCacheService;
    private playersService;
    constructor();
    static getInstance(): MatchsService;
    processMatch(match: {
        adversaryA: string;
        adversaryB: string;
        winner: string | null;
        draw: boolean;
    }): Promise<string>;
}
