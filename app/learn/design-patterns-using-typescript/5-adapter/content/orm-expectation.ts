let Database: any;

const postgressQuery = Database("postgress").query("products", {
  where: {
    name: {
      contains: "phone",
    },
    createdTime: new Date("2025-06-01"),
  },
});

const mysqlQuery = Database("mysql").query("products", {
  where: {
    name: {
      contains: "phone",
    },
    createdTime: new Date("2025-06-01"),
  },
});

// postgressQuery
`
SELECT *
FROM products
WHERE name ILIKE '%phone%'
  AND createdTime::date = '2025-06-01';
`;

// mysqlQuery
`
SELECT *
FROM products
WHERE LOWER(name) LIKE '%phone%'
  AND DATE(createdTime) = '2025-06-01';
`;
