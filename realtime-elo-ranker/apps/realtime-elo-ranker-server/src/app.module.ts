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
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';

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
    await this.addFakePlayers();
  }

  private async addFakePlayers() {
    if (await this.playerRepository.count() === 0) {
      const fakeRanking = FAKE_PLAYERS.map((player, index) => ({
        id: player,
        rank: 1000 + index * 10,
      })).sort((a, b) => b.rank - a.rank);

      const players = fakeRanking.map(ranking => {
        const player = new Player();
        player.name = ranking.id;
        player.rank = ranking.rank;
        return player;
      });

      await this.playerRepository.save(players);
    }
  }
}

