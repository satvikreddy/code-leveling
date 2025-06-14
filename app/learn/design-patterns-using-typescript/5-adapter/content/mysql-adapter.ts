// @ts-ignore
import mysql from "mysql2/promise";
import { DatabaseAdapter, QueryOptions } from "./database-adapter";

export class MySQLAdapter implements DatabaseAdapter {
  private connection: mysql.Connection | null = null;

  async connect(): Promise<void> {
    this.connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "myapp",
    });
    console.log("MySQL connected");
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      console.log("MySQL disconnected");
    }
  }

  async query(table: string, options: QueryOptions): Promise<any[]> {
    // The query construction logic is beyond the scope of this lesson
    const sql = ``;

    const [rows] = await this.connection.execute(sql);
    return rows as any[];
  }
}
