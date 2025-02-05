import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entity/entity.player';

@Injectable()
export class RankingCacheService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  public async setRankingData(name: string, rank: number): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { name } });
    if (player) {
      player.rank = rank;
      await this.playerRepository.save(player);
    } else {
      const newPlayer = this.playerRepository.create({ name, rank });
      await this.playerRepository.save(newPlayer);
    }
  }

  public async pushPlayerData(playerData: { name: string; rank: number; }): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { name: playerData.name } });
    if (player) {
      player.rank = playerData.rank;
      await this.playerRepository.save(player);
    } else {
      const newPlayer = this.playerRepository.create(playerData);
      await this.playerRepository.save(newPlayer);
    }
  }

  public async getRankingData(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  public async getId(name: string): Promise<number | undefined> {
    const player = await this.playerRepository.findOne({ where: { name } });
    return player ? player.id : undefined;
  }

  public async getRank(name: string): Promise<number | undefined> {
    const player = await this.playerRepository.findOne({ where: { name } });
    return player ? player.rank : undefined;
  }

  public async getAverageRanking(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      return 0;
    }
    const total = players.reduce((acc, player) => acc + player.rank, 0);
    return total / players.length;
  }

  public async updatePlayerRank(name: string, rankChange: number): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { name } });
    if (player) {
      player.rank = rankChange;
      await this.playerRepository.save(player);
    }
  }
}