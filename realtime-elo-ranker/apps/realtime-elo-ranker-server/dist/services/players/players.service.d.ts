export declare class PlayersService {
    private static instance;
    private rankingCacheService;
    constructor();
    static getInstance(): PlayersService;
    addPlayer(id: string): boolean | undefined;
    updatePlayer(id: string, rank: number): void;
    getPlayers(): string[];
    getPlayer(id: string): {
        id: string;
        rank: number;
    };
    getRankPlayer(id: string): number;
}
