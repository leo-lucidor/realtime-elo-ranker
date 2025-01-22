import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingCacheService } from './services/ranking-cache/ranking-cache.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RankingCacheService],
})
export class AppModule {}
