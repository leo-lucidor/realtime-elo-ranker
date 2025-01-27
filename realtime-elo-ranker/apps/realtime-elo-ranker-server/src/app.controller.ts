import { Controller, Get } from '@nestjs/common';
import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';
import { PlayersService } from './services/players/players.service';

@Controller()
export class AppController {
  private playersService: PlayersService;
  private rankingCacheService: RankingCacheService;

  constructor() {
    this.playersService = PlayersService.getInstance();
    this.rankingCacheService = RankingCacheService.getInstance();
  }

  @Get()
  getHome(): string {
    return PlayersService.getInstance().getPlayers().toString();
  }

  @Get("/api/ranking")
  getRanking(): { id: string, rank: number }[] {
    return this.rankingCacheService.getRanks();
  }

  @Get("/api/ranking/events")
  getRankingEvent(): string {
    return this.rankingCacheService.getRanks().toString();
  }

  @Get("/api/players")
  getPlayers(): string[] {
    return this.playersService.getPlayers();
  }

  @Get("/api/players/events")
  getPlayersEvent(): string {
    return this.playersService.addPlayer("test").id
  }

  // @Post("/api/players")
  // addPlayer(): string {
  //   return this.playersService.addPlayer("test").id;
  // }
}
