import { RankingEventType } from "./ranking-event";

export type RankingUpdate = {
  type: RankingEventType.RankingUpdate;
  player: {
    id: string;
    name: string;
    rank: number
  }
}