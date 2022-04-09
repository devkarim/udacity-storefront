import { ProductCategory } from './enums';
import db from '../services/db';
import { InternalServerError } from './errors';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: ProductCategory;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const conn = await db.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new InternalServerError(`Could not fetch products: ${err}`);
    }
  }

  async get(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=$1';
      const conn = await db.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new InternalServerError(`Could not get product: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn = await db.connect();
      const res = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new InternalServerError(`Could not create product: ${err}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM products WHERE id=$1';
      const conn = await db.connect();
      await conn.query(sql, [id]);
      conn.release();
      return true;
    } catch (err) {
      throw new InternalServerError(`Could not delete product: ${err}`);
    }
  }

  async clear(): Promise<boolean> {
    try {
      const sql = 'DELETE FROM products';
      const conn = await db.connect();
      await conn.query(sql);
      conn.release();
      return true;
    } catch (err) {
      throw new InternalServerError(`Could not clear products: ${err}`);
    }
  }
}
