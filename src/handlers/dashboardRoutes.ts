import { DashboardQueries } from './../services/dashboard';
import express, { Request, Response } from 'express';
import { ProductCategory } from '../models/enums';
import checkAuth from '../middlewares/checkAuth';
import { OrderStore } from '../models/order';

const dashboard = new DashboardQueries();
const orderStore = new OrderStore();

const expensiveProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostExpensiveProducts();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const products = await dashboard.getProductsByCategory(
      category as unknown as ProductCategory
    );
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrder();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.usersWithOrders();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { product_id, order_id, quantity } = req.body;
    const order = await orderStore.get(order_id);
    if (order.user_id != req.userId!.toString())
      return res
        .status(401)
        .json({ success: false, message: 'Order not owned.' });
    const orderProduct = await dashboard.addProductToOrder({
      product_id,
      order_id,
      quantity,
    });
    res.json(orderProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/products/category/:category', productsByCategory);
  app.get('/expensive', expensiveProducts);
  app.get('/products_in_orders', checkAuth, productsInOrders);
  app.get('/users_with_orders', checkAuth, usersWithOrders);
  app.post('/products/orders', checkAuth, addProductToOrder);
};

export default dashboardRoutes;
