import express, { Request, Response } from 'express';
import checkAuth from '../middlewares/checkAuth';
import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await store.get(productId);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = await store.create({ name, price, category });
    res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', checkAuth, create);
};

export default productRoutes;
