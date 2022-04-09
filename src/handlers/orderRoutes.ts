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

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.create(req.userId!);
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const completeOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await store.get(orderId);
    if (!order || order.user_id != req.userId!.toString())
      return res
        .status(400)
        .json({ success: false, message: 'Order not owned.' });
    const completedOrder = await store.complete(orderId);
    res.json(completedOrder);
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
  app.post('/orders', checkAuth, createOrder);
  app.post('/order/:id/complete', checkAuth, completeOrder);
  app.get('/user/:id/orders', checkAuth, userOrders);
  app.get('/user/:id/orders/completed', checkAuth, userCompletedOrders);
};

export default orderRoutes;
