import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayersService } from './players.service';
import { Player } from '../../entity/entity.player';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlayersService', () => {
  let service: PlayersService;
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
      providers: [PlayersService],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a player', async () => {
    await service.addPlayer('player1');
    const player = await repository.findOne({ where: { name: 'player1' } });
    expect(player).toBeDefined();
    expect(player?.name).toBe('player1');
  });

  it('should update a player rank', async () => {
    const player = await repository.save({ name: 'player2', rank: 1000 });
    await service.updatePlayer(player.id, 1100);
    const updatedPlayer = await repository.findOne({ where: { id: player.id } });
    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer!.rank).toBe(1100);
  });

  it('should get all players', async () => {
    await repository.save({ name: 'player3', rank: 1000 });
    const players = await service.getPlayers();
    expect(players.length).toBe(1);
    expect(players[0].name).toBe('player3');
  });

  it('should get a player by id', async () => {
    const player = await repository.save({ name: 'player4', rank: 1000 });
    const foundPlayer = await service.getPlayer(player.id);
    expect(foundPlayer).toBeDefined();
    expect(foundPlayer.name).toBe('player4');
  });

  it('should get a player rank by id', async () => {
    const player = await repository.save({ name: 'player5', rank: 1000 });
    const rank = await service.getRankPlayer(player.id);
    expect(rank).toBe(1000);
  });
});