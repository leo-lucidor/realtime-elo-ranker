import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entity/entity.player';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async addPlayer(name: string): Promise<void> {
    const existingPlayer = await this.playerRepository.findOne({ where: { name } });
    if (existingPlayer) {
      console.log(`Player with name ${name} already exists`);
    }
    else {
      if (name.length === 0) {
        throw new Error(`Player name cannot be empty`);
      } 
      else {
        const rank = await this.getAverageRanking();
        const newPlayer = this.playerRepository.create({ name, rank });
        this.playerRepository.save(newPlayer);
      }
    }
  }

  async updatePlayer(id: number, rank: number): Promise<void> {
    await this.playerRepository.update(id, { rank });
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async getPlayer(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player;
  }

  async getRankPlayer(id: number): Promise<number> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player.rank;
  }

  private async getAverageRanking(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      return 1000;
    }
    const totalRank = players.reduce((acc, player) => acc + player.rank, 0);
    return totalRank / players.length;
  }
}