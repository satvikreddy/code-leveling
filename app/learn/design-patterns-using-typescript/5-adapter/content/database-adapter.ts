export interface QueryOptions {
  where: Record<string, any>;
  select: Record<string, boolean>;
}

export interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query(table: string, options: QueryOptions): Promise<any[]>;
}
