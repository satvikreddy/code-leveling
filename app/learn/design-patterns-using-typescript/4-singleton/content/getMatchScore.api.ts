import { CacheService } from "./cache-service";

export async function getMatchScore(args: { matchId: string }) {
  const cache = new CacheService();

  const cachedScore = await cache.get(`match-score:${args.matchId}`);
  if (cachedScore) {
    return JSON.parse(cachedScore);
  }

  throw new Error("Match not found");
}
