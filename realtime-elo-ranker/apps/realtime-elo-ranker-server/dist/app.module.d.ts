import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './entity/entity.player';
export declare class AppModule implements OnModuleInit {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    onModuleInit(): Promise<void>;
    private addFakePlayers;
}
