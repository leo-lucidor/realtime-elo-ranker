import { Injectable, Scope } from '@nestjs/common';
import { FAKE_PLAYERS } from 'src/data/players.data';

@Injectable({ scope: Scope.DEFAULT })
export class PlayersService {
    private static instance: PlayersService;
    private cache: Map<string, number> = new Map();

    public static getInstance(): PlayersService {
        if (!PlayersService.instance) {
            PlayersService.instance = new PlayersService();
        }
        return PlayersService.instance;
    }

    constructor() {
        if (PlayersService.instance) {
            throw new Error("Error: Instantiation failed: Use PlayersService.getInstance() instead of new.");
        }
        PlayersService.instance = this;
    }

    set(key: string, value: number): void {
        this.cache.set(key, value);
    }

    get(key: string): number | undefined {
        return this.cache.get(key);
    }

    clear(): void {
        this.cache.clear();
    }

    getPlayers(): string[] {
        return FAKE_PLAYERS;
    }

    addPlayer(id: string): { id: string, rank: number } {
        if (!FAKE_PLAYERS.includes(id)) {
            FAKE_PLAYERS.push(id);
        }
        return { id, rank: 1000 };
    }
}