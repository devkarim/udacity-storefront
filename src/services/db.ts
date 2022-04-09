import { Pool } from 'pg';
import config from '../config';

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = config;

const db = new Pool({
  host: POSTGRES_HOST,
  database:
    ENV?.trim().toLowerCase() == 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default db;
