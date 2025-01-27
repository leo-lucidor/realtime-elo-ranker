import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RankingCacheService],
})
export class AppModule {}
