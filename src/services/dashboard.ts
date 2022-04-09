import { ProductCategory } from '../models/enums';
import { InternalServerError } from '../models/errors';
import { Product } from '../models/product';
import { ReadableUser } from '../models/user';
import db from './db';

export interface OrderProduct {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
}

export class DashboardQueries {
  async addProductToOrder(o: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO order_products (product_id, order_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const conn = await db.connect();
      const result = await conn.query(sql, [
        o.product_id,
        o.order_id,
        o.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product to order: ${err}`);
    }
  }

  async usersWithOrders(): Promise<ReadableUser[]> {
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

  async deleteOrderProduct(id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=$1';
      const conn = await db.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return true;
    } catch (err) {
      throw new InternalServerError(
        `Could not fetch delete order product: ${err}`
      );
    }
  }
}
