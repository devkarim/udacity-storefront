import { DashboardQueries } from './../services/dashboard';
import express, { Request, Response } from 'express';
import { ProductCategory } from '../models/enums';

const dashboard = new DashboardQueries();

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

const dashboardRoutes = (app: express.Application) => {
  app.get('/products/category/:category', productsByCategory);
  app.get('/expensive', expensiveProducts);
};

export default dashboardRoutes;
