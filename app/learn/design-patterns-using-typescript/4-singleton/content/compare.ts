import { CacheServiceSingleton } from "./cache-service-singleton";
import { CacheService } from "./cache-service";

new CacheService().get("match-score:123");
new CacheService().get("match-score:123");
new CacheService().get("match-score:123");
new CacheService().get("match-score:123");
// This will log "🔌 Redis connection created" 4 times

CacheServiceSingleton.getInstance().get("match-score:123");
CacheServiceSingleton.getInstance().get("match-score:123");
CacheServiceSingleton.getInstance().get("match-score:123");
CacheServiceSingleton.getInstance().get("match-score:123");
// This will log "🔌 Redis connection created" 1 time
