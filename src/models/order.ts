import db from '../services/db';
import { OrderStatus } from './enums';
import { InternalServerError } from './errors';

export interface Order {
  id?: number;
  status: OrderStatus;
  user_id: string;
}

export class OrderStore {
  async create(user_id: number): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
      const conn = await db.connect();
      const res = await conn.query(sql, [user_id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new InternalServerError(`Could not create order: ${err}`);
    }
  }

  async getCurrentByUser(id: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=$1';
      const conn = await db.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new InternalServerError(`Could not fetch current orders: ${err}`);
    }
  }

  async getCompletedByUser(id: number): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='COMPLETE'";
      const conn = await db.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new InternalServerError(`Could not fetch completed orders: ${err}`);
    }
  }

  async complete(id: number): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
      const conn = await db.connect();
      const res = await conn.query(sql, ['COMPLETE', id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new InternalServerError(`Could not complete order: ${err}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM orders WHERE id=$1';
      const conn = await db.connect();
      await conn.query(sql, [id]);
      conn.release();
      return true;
    } catch (err) {
      throw new InternalServerError(`Could not delete order: ${err}`);
    }
  }

  async clear(): Promise<boolean> {
    try {
      const sql = 'DELETE FROM orders';
      const conn = await db.connect();
      await conn.query(sql);
      conn.release();
      return true;
    } catch (err) {
      throw new InternalServerError(`Could not clear orders: ${err}`);
    }
  }
}
