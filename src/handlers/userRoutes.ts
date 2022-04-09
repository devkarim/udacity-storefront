import express, { Request, Response } from 'express';
import checkAuth from '../middlewares/checkAuth';
import { UserStore } from '../models/user';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    const authUser = await store.create({
      first_name,
      last_name,
      username,
      password,
    });
    res.json(authUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const authUser = await store.authenticate(username, password);
    if (!authUser) return res.status(400).json('Invalid username or password.');
    res.json(authUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await store.get(userId);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users/signup', create);
  app.post('/users/authenticate', authenticate);
  app.get('/users', checkAuth, index);
  app.get('/users/:id', checkAuth, show);
};

export default userRoutes;
