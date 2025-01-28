import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';
import { PlayersService } from './services/players/players.service';
import { MatchsService } from './services/matchs/matchs.service';
import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { FAKE_PLAYERS } from './data/players.data';

@Controller()
export class AppController {
  private playersService: PlayersService;
  private rankingCacheService: RankingCacheService;
  private matchService: MatchsService;

  constructor() {
    this.playersService = PlayersService.getInstance();
    this.rankingCacheService = RankingCacheService.getInstance();
    this.matchService = MatchsService.getInstance();
  }

  @Get()
  getHome(): string {
    return PlayersService.getInstance().getPlayers().toString();
  }

  @Post("/api/player")
  postPlayer(@Res() res: Response, @Body() body: { id: string }): void {
    const { id } = body;
    console.log(`Received player: id=${id}`);
    this.playersService.addPlayer(id);
    res.status(200).send(id);
  }

  @Get("/api/ranking/")
  getRanking(): string {
    return this.rankingCacheService.getRankingData("ranking");
  }

  @Get('/api/ranking/events')
  getRankingEvent(@Res() res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    setInterval(() => {
      res.write("event: message\n" + "data: " + JSON.stringify({
        type: "RankingUpdate",
        player: {
          id: FAKE_PLAYERS[Math.floor(Math.random() * FAKE_PLAYERS.length)],
          rank: Math.floor(Math.random() * 2500)
        }
      }) + '\n\n');
    }, 500);
  }

  @Post("/api/match")
  async postMatch(@Res() res: Response, @Body() body: { adversaryA: string, adversaryB: string, winner: string | null, draw: boolean }): Promise<void> {
    const matchService = this.matchService;
    const { adversaryA, adversaryB, winner, draw } = body;
  
    console.log(`Received match: adversaryA=${adversaryA}, adversaryB=${adversaryB}, winner=${winner}, draw=${draw}`);
  
    if (!adversaryA || !adversaryB) {
      console.error('adversaryA or adversaryB is undefined');
      res.status(400).send('Invalid request: adversaryA or adversaryB is undefined');
      return;
    }
  
    const result = await matchService.processMatch({ adversaryA, adversaryB, winner, draw });
    res.status(200).send(result);
  }
}
