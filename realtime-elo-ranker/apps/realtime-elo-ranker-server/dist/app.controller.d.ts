import { Response } from 'express';
export declare class AppController {
    private playersService;
    private rankingCacheService;
    private matchService;
    constructor();
    getHome(): string;
    postPlayer(res: Response, body: {
        id: string;
    }): void;
    getRanking(): string;
    getRankingEvent(res: Response): void;
    postMatch(res: Response, body: {
        adversaryA: string;
        adversaryB: string;
        winner: string | null;
        draw: boolean;
    }): Promise<void>;
}
