// @ts-ignore
import { Client } from "pg";
import { DatabaseAdapter, QueryOptions } from "./database-adapter";

export class PostgreSQLAdapter implements DatabaseAdapter {
  private client: Client | null = null;

  async connect(): Promise<void> {
    this.client = new Client({
      host: "localhost",
      port: 5432,
      database: "myapp",
      user: "postgres",
      password: "password",
    });

    await this.client.connect();
    console.log("PostgreSQL connected");
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      console.log("PostgreSQL disconnected");
    }
  }

  async query(table: string, options: QueryOptions): Promise<any[]> {
    // The query construction logic is beyond the scope of this lesson
    const sql = ``;

    const result = await this.client.query(sql);
    return result.rows;
  }
}
