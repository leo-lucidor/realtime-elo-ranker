import { Repository } from 'typeorm';
import { Player } from '../../entity/entity.player';
export declare class RankingCacheService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    setRankingData(name: string, rank: number): Promise<void>;
    pushPlayerData(playerData: {
        name: string;
        rank: number;
    }): Promise<void>;
    getRankingData(): Promise<Player[]>;
    getId(name: string): Promise<number | undefined>;
    getRank(name: string): Promise<number | undefined>;
    getAverageRanking(): Promise<number>;
    updatePlayerRank(name: string, rankChange: number): Promise<void>;
}
