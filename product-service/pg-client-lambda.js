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

export const invoke = async () => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const ddlResult1 = await client.query(`
      create table if not exists products (
        id serial primary key,
        title text,
        description text,
        price integer
      )
    `);

    const ddlResult2 = await client.query(`
      create table if not exists stocks (
        id serial primary key,
        product_id integer,
        count integer,
        foreign key ("product_id") references "products" ("id")
      )`);

    const dmlResult1 = await client.query(`
      insert into products (title, description, price) values
        ('Black Cat', 'Маленькая игривая кошка', 24),
        ('White Dog', 'Собака-компаньон и обжора', 10),
        ('Big Fish', 'Рыбка для аквариума', 7),
        ('Crocodile', 'Если у вас вдруг есть пруд', 15)
    `);

    const dmlResult2 = await client.query(`
      insert into stocks (product_id, count) values
        (1, 24),
        (2, 10),
        (3, 7),
        (4, 15)
    `);

    const { rows: product } = await client.query(`select * from products`);
    const { rows: stock } = await client.query(`select * from stocks`);
    console.log(product, stock);
  } catch (err) {
    console.error('Error database', err)
  } finally {
    console.log('Success database')
    client.end();
  }
};
