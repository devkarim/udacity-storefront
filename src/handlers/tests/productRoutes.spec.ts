import { UserStore } from './../../models/user';
import supertest from 'supertest';
import { AuthenticatedUser, User } from '../../models/user';
import app from '../../server';
import { ProductCategory } from '../../models/enums';
import { Product, ProductStore } from '../../models/product';

const req = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Product Endpoints', () => {
  const u: User = {
    username: 'john6',
    first_name: 'John',
    last_name: 'Doe',
    password: 'test123',
  };
  const p: Product = {
    name: 'Airpods Pro',
    price: 599,
    category: ProductCategory.ELECTRONICS,
  };

  let token: string;
  let id: number;

  it('should authenticate user', async () => {
    await userStore.create(u);
    const res = await req
      .post('/users/authenticate')
      .send({ username: u.username, password: u.password });
    const data: AuthenticatedUser = res.body;
    token = data.token;
    expect(data.user.username).toEqual(u.username);
  });

  it('should create a new product when authenticated', async () => {
    const res = await req
      .post('/products')
      .send(p)
      .set('Authorization', `Bearer ${token}`);
    const data: Product = res.body;
    id = data.id!;
    expect(data.name).toEqual(p.name);
  });

  it('should not create a new product when not authenticated', async () => {
    const res = await req
      .post('/products')
      .send(p)
      .set('Authorization', `Bearer xx${token}xx`);
    expect(res.statusCode).toEqual(401);
  });

  it('should show all products', async () => {
    const res = await req.get('/products');
    const data: Product[] = res.body;
    expect(data[0].name).toBeDefined();
  });

  it('should get specific product', async () => {
    const res = await req.get(`/products/${id}`);
    const data: Product = res.body;
    expect(data.name).toEqual(p.name);
  });

  afterAll(async () => {
    await userStore.delete(u.username);
    await productStore.delete(id);
  });
});
