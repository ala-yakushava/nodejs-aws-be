import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const getProducts = async () => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: product } = await client.query(`select * from products`);
    const { rows: stock } = await client.query(`select * from stocks`);

    const result = product.map((item) => {
      const { id } = item;
      const counts = stock.filter(({ product_id }) => product_id === id);
      const { count } = counts[0];
      return { ...item, count };
    });

    return result;
  } catch (err) {
    console.error('Error database', err)
  } finally {
    console.log('Success database')
    client.end();
  }
};
