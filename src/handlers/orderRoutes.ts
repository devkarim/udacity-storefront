import express, { Request, Response } from 'express';
import checkAuth from '../middlewares/checkAuth';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const userOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const orders = await store.getCurrentByUser(userId);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const userCompletedOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const completedOrders = await store.getCompletedByUser(userId);
    res.json(completedOrders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/user/:id/orders', checkAuth, userOrders);
  app.get('/user/:id/orders/completed', checkAuth, userCompletedOrders);
};

export default orderRoutes;
