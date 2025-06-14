import { MySQLAdapter } from "./mysql-adapter";
import { DatabaseAdapter } from "./database-adapter";

class DatabaseService {
  constructor(private database: DatabaseAdapter) {}

  async initialize() {
    await this.database.connect();
  }

  async cleanup() {
    await this.database.disconnect();
  }

  async getUserById(userId: string) {
    return await this.database.query("users", {
      where: { userId },
      select: { id: true, name: true, phone: true },
    });
  }
}

async function main() {
  const mysqlService = new DatabaseService(new MySQLAdapter());

  await mysqlService.initialize();

  const user = await mysqlService.getUserById("d76dg6");

  await mysqlService.cleanup();
}
