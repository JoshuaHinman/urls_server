import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

// const pool = new Pool ({
//   user: 'postgres',
//   password: 'ogamiitto1',
//   host: 'localhost',
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME
// });

// const pool = new Pool ({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE
// });
const connectionString = process.env.DB_CONNECTION;
console.log(connectionString);
const pool = new Pool ({
  connectionString,
});

const query = (text, params) => pool.query(text, params);

export default query;