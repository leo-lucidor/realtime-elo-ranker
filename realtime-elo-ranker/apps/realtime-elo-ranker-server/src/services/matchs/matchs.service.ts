import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entity/entity.player';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  public async processMatch(match: { adversaryA: string, adversaryB: string, winner: string | null, draw: boolean }): Promise<string> {
    const { adversaryA, adversaryB, winner, draw } = match;

    const playerA = await this.playerRepository.findOne({ where: { name: adversaryA } });
    const playerB = await this.playerRepository.findOne({ where: { name: adversaryB } });

    if (!playerA || !playerB) {
      throw new Error(`One of the players does not exist`);
    }

    const playerARank = playerA.rank;
    const playerBRank = playerB.rank;

    const K = 32;
    const weA = 1 / (1 + Math.pow(10, (playerBRank - playerARank) / 400));
    const weB = 1 / (1 + Math.pow(10, (playerARank - playerBRank) / 400));

    let scoreA = 0.5;
    let scoreB = 0.5;
    let result = "Match nul";

    if (!draw) {
      if (winner === adversaryA) {
        scoreA = 1;
        scoreB = 0;
        result = `${adversaryA} gagne`;
      } else if (winner === adversaryB) {
        scoreA = 0;
        scoreB = 1;
        result = `${adversaryB} gagne`;
      } else {
        throw new Error(`Winner must be one of the players`);
      }
    }

    const scoreAUpdated = Math.round(playerARank + K * (scoreA - weA));
    const scoreBUpdated = Math.round(playerBRank + K * (scoreB - weB));

    playerA.rank = scoreAUpdated;
    playerB.rank = scoreBUpdated;

    await this.playerRepository.save(playerA);
    await this.playerRepository.save(playerB);

    return result;
  }
}