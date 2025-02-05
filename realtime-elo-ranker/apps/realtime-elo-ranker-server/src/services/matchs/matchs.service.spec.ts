import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchsService } from './matchs.service';
import { Player } from '../../entity/entity.player';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MatchsService', () => {
  let service: MatchsService;
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
      providers: [MatchsService],
    }).compile();

    service = module.get<MatchsService>(MatchsService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process a match with a winner', async () => {
    const playerA = await repository.save({ name: 'playerA', rank: 1000 });
    const playerB = await repository.save({ name: 'playerB', rank: 1000 });

    const result = await service.processMatch({
      adversaryA: 'playerA',
      adversaryB: 'playerB',
      winner: 'playerA',
      draw: false,
    });

    const updatedPlayerA = await repository.findOne({ where: { name: 'playerA' } });
    const updatedPlayerB = await repository.findOne({ where: { name: 'playerB' } });

    expect(result).toBe('playerA gagne');
    expect(updatedPlayerA).not.toBeNull();
    expect(updatedPlayerA!.rank).toBeGreaterThan(1000);
    expect(updatedPlayerB).not.toBeNull();
    expect(updatedPlayerB!.rank).toBeLessThan(1000);
  });

  it('should process a match with a draw', async () => {
    const playerA = await repository.save({ name: 'playerA', rank: 1000 });
    const playerB = await repository.save({ name: 'playerB', rank: 1000 });

    const result = await service.processMatch({
      adversaryA: 'playerA',
      adversaryB: 'playerB',
      winner: null,
      draw: true,
    });

    const updatedPlayerA = await repository.findOne({ where: { name: 'playerA' } });
    const updatedPlayerB = await repository.findOne({ where: { name: 'playerB' } });

    expect(result).toBe('Match nul');
    expect(updatedPlayerA).not.toBeNull();
    expect(updatedPlayerA!.rank).toBe(1000);
    expect(updatedPlayerB).not.toBeNull();
    expect(updatedPlayerB!.rank).toBe(1000);
  });

  it('should throw an error if one of the players does not exist', async () => {
    await repository.save({ name: 'playerA', rank: 1000 });

    await expect(
      service.processMatch({
        adversaryA: 'playerA',
        adversaryB: 'playerB',
        winner: 'playerA',
        draw: false,
      }),
    ).rejects.toThrow('One of the players does not exist');
  });

  it('should throw an error if winner is not one of the players', async () => {
    await repository.save({ name: 'playerA', rank: 1000 });
    await repository.save({ name: 'playerB', rank: 1000 });

    await expect(
      service.processMatch({
        adversaryA: 'playerA',
        adversaryB: 'playerB',
        winner: 'playerC',
        draw: false,
      }),
    ).rejects.toThrow('Winner must be one of the players');
  });
});