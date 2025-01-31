import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { PlayersService } from '../players/players.service';


@Injectable()
export class MatchsService {
    private static instance: MatchsService;
    private rankingCacheService: RankingCacheService;
    private playersService: PlayersService;

    constructor() {
        this.rankingCacheService = RankingCacheService.getInstance();
        this.playersService = PlayersService.getInstance();
    }

    public static getInstance(): MatchsService {
        if (!MatchsService.instance) {
            MatchsService.instance = new MatchsService();
        }
        return MatchsService.instance;  
    }

    public async processMatch(match: { adversaryA: string, adversaryB: string, winner: string | null, draw: boolean }): Promise<string> {
        const { adversaryA, adversaryB, winner, draw } = match;
        
        // regarde si les deux joueurs exitent dans le cache
        if (!this.rankingCacheService.getId(adversaryA) || !this.rankingCacheService.getId(adversaryB)) {
            throw new Error(`One of the players does not exist`);
        }

        const playerARank = this.playersService.getRankPlayer(adversaryA);
        const playerBRank = this.playersService.getRankPlayer(adversaryB);

        const K = 32;
        const weA = 1 / (1 + Math.pow(10, (playerBRank - playerARank) / 400));
        const weB = 1 / (1 + Math.pow(10, (playerARank - playerBRank) / 400));

        let scoreA = 0.5;
        let scoreB = 0.5;
        let result = "Match nul";

        if(!draw){
            if(winner === adversaryA){
                scoreA = 1;
                scoreB = 0;
                result = `${adversaryA} gagne`;
            } else if(winner === adversaryB){
                scoreA = 0;
                scoreB = 1;
                result = `${adversaryB} gagne`;
            } else {
                throw new Error(`Winner must be one of the players`);
            }
        }

        const scoreAUpdated = Math.round(playerARank + K * (scoreA - weA));
        const scoreBUpdated = Math.round(playerBRank + K * (scoreB - weB));

        this.rankingCacheService.updatePlayerRank(adversaryA, scoreAUpdated);
        this.rankingCacheService.updatePlayerRank(adversaryB, scoreBUpdated);

        return result;
    }
}