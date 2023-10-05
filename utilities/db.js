import pg from 'pg';
const { Pool } = pg;
//import dotenv from 'dotenv';
//dotenv.config();

const pool = new Pool ({
  user: 'postgres',
  password: 'ogamiitto1',
  host: 'localhost',
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

const query = (text, params) => pool.query(text, params);

export default query;