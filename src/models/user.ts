import { generateToken } from './../helpers/utils';
import db from '../services/db';
import bcrypt from 'bcrypt';
import { InternalServerError } from './errors';
import config from '../config';

export interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthenticatedUser {
  user: User;
  token: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT username, first_name, last_name FROM users';
      const conn = await db.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new InternalServerError(`Could not fetch users: ${err}`);
    }
  }

  async get(id: number): Promise<User> {
    try {
      const sql =
        'SELECT username, first_name, last_name FROM users WHERE id=$1';
      const conn = await db.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new InternalServerError(`Could not get user by id: ${err}`);
    }
  }

  async create(u: User): Promise<AuthenticatedUser> {
    try {
      const sql =
        'INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await db.connect();
      const hashed_password = bcrypt.hashSync(
        u.password + config.BCRYPT_SECRET,
        parseInt(config.SALT_ROUNDS!)
      );
      const res = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        hashed_password,
      ]);
      conn.release();
      return { user: res.rows[0], token: generateToken({ user_id: u.id }) };
    } catch (err) {
      throw new InternalServerError(`Could not create user: ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<AuthenticatedUser | null> {
    try {
      const user = await this.getByName(username);
      if (!user) return null;
      if (!bcrypt.compareSync(password + config.BCRYPT_SECRET, user.password))
        return null;
      return { user, token: generateToken({ user_id: user.id }) };
    } catch (err) {
      throw new InternalServerError(`Could not authenticate user: ${err}`);
    }
  }

  async getByName(username: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE username=$1';
      const conn = await db.connect();
      const res = await conn.query(sql, [username]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new InternalServerError(`Could not get user by username: ${err}`);
    }
  }

  async delete(username: string): Promise<boolean> {
    try {
      const sql = 'DELETE FROM users WHERE username=$1';
      const conn = await db.connect();
      await conn.query(sql, [username]);
      conn.release();
      return true;
    } catch (err) {
      throw new InternalServerError(`Could not delete user: ${err}`);
    }
  }
}
