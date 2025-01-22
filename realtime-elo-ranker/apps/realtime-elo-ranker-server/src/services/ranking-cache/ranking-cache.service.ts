import { Injectable, Scope } from '@nestjs/common';
import 

@Injectable({ scope: Scope.DEFAULT })
export class RankingCacheService {
    private cache: Map<string, any> = new Map();

    set(key: string, value: any): void {
        this.cache.set(key, value);
    }

    get(key: string): any | undefined {
        return this.cache.get(key);
    }

    clear(): void {
        this.cache.clear();
    }
}