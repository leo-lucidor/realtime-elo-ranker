import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';
import { PlayersService } from './services/players/players.service';
import { MatchsService } from './services/matchs/matchs.service';
import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly rankingCacheService: RankingCacheService,
    private readonly playersService: PlayersService,
    private readonly matchService: MatchsService
  ) {}

  @Get()
  getHome(): string {
    return this.playersService.getPlayers().toString();
  }

  @Post("/api/player")
  postPlayer(@Res() res: Response, @Body() body: { id: string }): void {
    let { id } = body;
    this.playersService.addPlayer(id);
    res.status(200).send(id);
  }

  @Get("/api/ranking/")
  async getRanking(): Promise<string> {
    const rankingData = await this.rankingCacheService.getRankingData();
    return JSON.stringify(rankingData);
  }

  @Get('/api/ranking/events')
  async getRankingEvent(@Res() res: Response): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
  
    const sendRankingUpdate = async () => {
      const players = await this.playersService.getPlayers();
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      const newRank = randomPlayer.rank + Math.floor(Math.random() * 10) - 5;
  
      await this.rankingCacheService.updatePlayerRank(randomPlayer.name, newRank);
  
      res.write("event: message\n" + "data: " + JSON.stringify({
        type: "RankingUpdate",
        player: {
          id: randomPlayer.name,
          name: randomPlayer.name,
          rank: newRank,
        }
      }) + '\n\n');
    };
  
    const intervalId = setInterval(sendRankingUpdate, 500);
  
    res.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  }


  @Post("/api/match")
  async postMatch(@Res() res: Response, @Body() body: { adversaryA: string, adversaryB: string, winner: string | null, draw: boolean }): Promise<void> {
    if (body.adversaryA === "" || body.adversaryB === "") {
      res.status(400).send("Adversary names cannot be empty");
      return;
    }
    if (body.adversaryA === body.adversaryB) {
      res.status(400).send("Adversaries must be different");
      return;
    }
    else {
      const result = await this.matchService.processMatch(body);
      res.status(200).send(result);
    }
  }
}
