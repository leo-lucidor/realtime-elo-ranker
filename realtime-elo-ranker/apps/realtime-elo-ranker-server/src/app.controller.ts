import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';
import { PlayersService } from './services/players/players.service';
import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';

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

  // @Get("/api/ranking/events")
  // getRankingEvent(): string {
  //   return this.rankingCacheService.getRanks().toString();
  // }

  @Get("/api/players")
  getPlayers(): string[] {
    return this.playersService.getPlayers();
  }

  @Get("/api/players/events")
  getPlayersEvent(): string {
    return this.playersService.addPlayer("test").id
  }

  @Get('/api/ranking/events')
  subscribeRankingEvents(@Res() res: Response, @Req() req: Request): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '');

    const sendRankingUpdate = () => {
      const players = this.playersService.getPlayers();
      const randomPlayer = players[Math.floor(Math.random() players.length)];
      const data = {
        type: "RankingUpdate",
        player: randomPlayer
      };
      res.write(event: message\n);
      res.write(data: ${JSON.stringify(data)}\n\n);
    };

    const interval = setInterval(sendRankingUpdate, 500);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  }
}
