## Intro

We are building an ORM. In short, an ORM lets you query a database without writing raw query. It sort of looks like [orm-expectation](orm-expectation.ts)

Note the differences in the query syntax between MySQL and PostgreSQL. ORM abstracts the different query syntax and lets us query in a unified way.

How do we implement this? The challenge is that not only is the query syntax different, but we have different packages as well - [pg](https://www.npmjs.com/package/pg) for postgres and [mysql2](https://www.npmjs.com/package/mysql2) for mysql. We need to convert these packages into a unified interface, kinda like a [USB to type C adapter](https://blacki.co.in/cdn/shop/files/1-1.png?v=1701265869).

💡 Wait, is this what the "Adapter" design pattern is? Converting one type to another type. Yes, it is!

## Solution

We have [database-adapter.ts](database-adapter.ts) interface with specific adapters like

- [postgress-adapter.ts](postgress-adapter.ts)
- [mysql-adapter.ts](mysql-adapter.ts)

The differences in packages and query syntax are inside the specific adapters.

## Usage

See [usage.ts](usage.ts) which uses the MySQLAdapter. If we ever migrate to PostgreSQL, we just need to pass the PostgreSQLAdapter instead. It is that simple!

Note: In practice, you would never build your own ORM. This was just to demonstrate the adapter pattern.

## Did you know?

- [axios uses adapter](https://github.com/axios/axios/blob/main/lib/adapters/README.md) pattern that allows it to support both Node.js and browser environments.
- [PrismaORM has adapters](https://github.com/prisma/prisma/tree/main/packages/adapter-pg) for postgres, mysql, sqlite and more.

🌱 Lesson Complete!

[Next pattern: Coming soon →]()
