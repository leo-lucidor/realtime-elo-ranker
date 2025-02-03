import { Repository } from 'typeorm';
import { Player } from '../../entity/entity.player';
export declare class MatchsService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    processMatch(match: {
        adversaryA: string;
        adversaryB: string;
        winner: string | null;
        draw: boolean;
    }): Promise<string>;
}
