import { ProductCategory } from './../../models/enums';
import { Product, ProductStore } from './../../models/product';
import { UserStore } from './../../models/user';
import supertest from 'supertest';
import { AuthenticatedUser, User } from '../../models/user';
import app from '../../server';
import { Order, OrderStore } from '../../models/order';

const req = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe('Dashboard Endpoints', () => {
  const u: User = {
    username: 'john8',
    first_name: 'John',
    last_name: 'Doe',
    password: 'test123',
  };

  const p: Product = {
    name: 'Airpods',
    price: 399,
    category: ProductCategory.ELECTRONICS,
  };

  const p2: Product = {
    name: 'Airpods Pro',
    price: 599,
    category: ProductCategory.ELECTRONICS,
  };

  let token: string;
  let order_id: number;

  it('should authenticate user', async () => {
    const authUser = await userStore.create(u);
    const res = await req
      .post('/users/authenticate')
      .send({ username: u.username, password: u.password });
    const data: AuthenticatedUser = res.body;
    token = data.token;
    u.id = authUser.user.id;
    expect(data.user.username).toEqual(u.username);
  });

  it('should get most expensive products', async () => {
    await productStore.create(p);
    await productStore.create(p2);
    const res = await req.get('/expensive');
    const data: Product[] = res.body;
    expect(data[1].name).toEqual(p.name);
  });

  it('should get products by category', async () => {
    const res = await req.get(
      `/products/category/${ProductCategory.ELECTRONICS}`
    );
    const data: Product[] = res.body;
    expect(data.length).toEqual(2);
  });

  afterAll(async () => {
    await orderStore.clear();
    await productStore.clear();
    await userStore.delete(u.username);
  });
});
