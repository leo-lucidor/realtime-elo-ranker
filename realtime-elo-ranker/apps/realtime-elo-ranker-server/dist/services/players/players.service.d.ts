import { Repository } from 'typeorm';
import { Player } from '../../entity/entity.player';
export declare class PlayersService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    addPlayer(name: string): Promise<Player>;
    updatePlayer(id: number, rank: number): Promise<void>;
    getPlayers(): Promise<Player[]>;
    getPlayer(id: number): Promise<Player>;
    getRankPlayer(id: number): Promise<number>;
    private getAverageRanking;
}
