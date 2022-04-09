import { ProductCategory } from '../models/enums';
import { InternalServerError } from '../models/errors';
import { Product } from '../models/product';
import db from './db';

export class DashboardQueries {
  async usersWithOrders(): Promise<
    { username: string; firstName: string; lastName: string }[]
  > {
    try {
      const sql =
        'SELECT username, first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id';
      const conn = await db.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users with orders: ${err}`);
    }
  }

  async productsInOrder(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
      const conn = await db.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products in orders: ${err}`);
    }
  }

  async fiveMostExpensiveProducts(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
      const conn = await db.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new InternalServerError(
        `Could not fetch five most expensive products: ${err}`
      );
    }
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE category=$1';
      const conn = await db.connect();
      const result = await conn.query(sql, [ProductCategory[category]]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new InternalServerError(
        `Could not fetch five most expensive products: ${err}`
      );
    }
  }
}
