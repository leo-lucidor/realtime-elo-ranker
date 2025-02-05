import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingCacheService } from './ranking-cache.service';
import { Player } from '../../entity/entity.player';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RankingCacheService', () => {
  let service: RankingCacheService;
  let repository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Player],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Player]),
      ],
      providers: [RankingCacheService],
    }).compile();

    service = module.get<RankingCacheService>(RankingCacheService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set ranking data', async () => {
    await service.setRankingData('player1', 1000);
    const player = await repository.findOne({ where: { name: 'player1' } });
    expect(player).toBeDefined();
    expect(player?.rank).toBe(1000);
  });

  it('should push player data', async () => {
    await service.pushPlayerData({ name: 'player2', rank: 1100 });
    const player = await repository.findOne({ where: { name: 'player2' } });
    expect(player).toBeDefined();
    expect(player?.rank).toBe(1100);
  });

  it('should get ranking data', async () => {
    await service.pushPlayerData({ name: 'player3', rank: 1200 });
    const rankingData = await service.getRankingData();
    expect(rankingData.length).toBe(1);
    expect(rankingData[0].name).toBe('player3');
    expect(rankingData[0].rank).toBe(1200);
  });

  it('should get player id', async () => {
    await service.pushPlayerData({ name: 'player4', rank: 1300 });
    const playerId = await service.getId('player4');
    const player = await repository.findOne({ where: { name: 'player4' } });
    expect(playerId).toBe(player?.id);
  });

  it('should get player rank', async () => {
    await service.pushPlayerData({ name: 'player5', rank: 1400 });
    const playerRank = await service.getRank('player5');
    expect(playerRank).toBe(1400);
  });

  it('should get average ranking', async () => {
    await service.pushPlayerData({ name: 'player6', rank: 1500 });
    await service.pushPlayerData({ name: 'player7', rank: 1600 });
    const averageRanking = await service.getAverageRanking();
    expect(averageRanking).toBe(1550);
  });

  it('should update player rank', async () => {
    await service.pushPlayerData({ name: 'player8', rank: 1700 });
    await service.updatePlayerRank('player8', 100);
    const player = await repository.findOne({ where: { name: 'player8' } });
    expect(player?.rank).toBe(1800);
  });
});