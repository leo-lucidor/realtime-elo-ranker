import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';
import { PlayersService } from './services/players/players.service';
import { MatchsService } from './services/matchs/matchs.service';
import { Response } from 'express';
export declare class AppController {
    private readonly rankingCacheService;
    private readonly playersService;
    private readonly matchService;
    constructor(rankingCacheService: RankingCacheService, playersService: PlayersService, matchService: MatchsService);
    getHome(): string;
    postPlayer(res: Response, body: {
        name: string;
    }): void;
    getRanking(): Promise<string>;
    getRankingEvent(res: Response): Promise<void>;
    postMatch(res: Response, body: {
        adversaryA: string;
        adversaryB: string;
        winner: string | null;
        draw: boolean;
    }): Promise<void>;
}
