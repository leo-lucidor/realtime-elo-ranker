export declare class AppController {
    private playersService;
    private rankingCacheService;
    constructor();
    getHome(): string;
    getRanking(): {
        id: string;
        rank: number;
    }[];
    getRankingEvent(): string;
    getPlayers(): string[];
    getPlayersEvent(): string;
}
