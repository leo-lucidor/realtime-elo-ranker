export declare class PlayersService {
    private static instance;
    private cache;
    static getInstance(): PlayersService;
    constructor();
    set(key: string, value: number): void;
    get(key: string): number | undefined;
    clear(): void;
    getPlayers(): string[];
    addPlayer(id: string): {
        id: string;
        rank: number;
    };
    updatePlayer(id: string, rank: number): void;
}
