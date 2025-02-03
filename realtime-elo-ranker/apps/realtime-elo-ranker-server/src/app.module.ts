import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';
import { PlayersService } from './services/players/players.service';
import { MatchsService } from './services/matchs/matchs.service';
import { FAKE_PLAYERS } from './data/players.data';
import { Player } from './entity/entity.player';
import { Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Player],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player]),
  ],
  controllers: [AppController],
  providers: [RankingCacheService, PlayersService, MatchsService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async onModuleInit() {
    const players = FAKE_PLAYERS.map((name, index) => ({
      name,
      rank: 1000 + index * 10,
    }));

    await this.playerRepository.save(players);
  }
}

function InjectRepository(entity: Function) {
  return Inject(getRepositoryToken(entity));
}