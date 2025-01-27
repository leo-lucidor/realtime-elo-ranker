export declare class AppController {
    private playersService;
    private rankingCacheService;
    constructor();
    getHome(): string;
    getRanking(): {
        id: string;
        rank: number;
    }[];
    getPlayers(): string[];
    getPlayersEvent(): string;
    subscribeRankingEvents(res: Response, req: Request): void;
}
