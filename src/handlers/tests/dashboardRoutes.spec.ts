import { DashboardQueries, OrderProduct } from './../../services/dashboard';
import { ProductCategory } from './../../models/enums';
import { Product, ProductStore } from './../../models/product';
import { UserStore, ReadableUser } from './../../models/user';
import supertest from 'supertest';
import { AuthenticatedUser, User } from '../../models/user';
import app from '../../server';
import { Order, OrderStore } from '../../models/order';

const req = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const dashboard = new DashboardQueries();

describe('Dashboard Endpoints', () => {
  const u: User = {
    username: 'john8',
    first_name: 'John',
    last_name: 'Doe',
    password: 'test123',
  };

  let p: Product = {
    name: 'Airpods',
    price: 399,
    category: ProductCategory.ELECTRONICS,
  };

  let p2: Product = {
    name: 'Airpods Pro',
    price: 599,
    category: ProductCategory.ELECTRONICS,
  };

  let token: string;
  let order_id: number;
  let orderProduct: OrderProduct;

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
    p = await productStore.create(p);
    p2 = await productStore.create(p2);
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

  it('should add product when authenticated', async () => {
    order_id = (await orderStore.create(u.id!)).id!;
    const res = await req
      .post(`/products/orders`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: p.id,
        order_id,
        quantity: 5,
      });
    orderProduct = res.body;
    expect(orderProduct.quantity).toEqual(5);
  });

  it('should get products in order', async () => {
    const res = await req
      .get(`/products_in_orders`)
      .set('Authorization', `Bearer ${token}`);
    const products: Product[] = res.body;
    expect(products[0].price).toEqual(399);
  });

  it('should get users with orders', async () => {
    const res = await req
      .get(`/users_with_orders`)
      .set('Authorization', `Bearer ${token}`);
    const users: ReadableUser[] = res.body;
    expect(users[0].username).toEqual(u.username);
  });

  afterAll(async () => {
    await dashboard.deleteOrderProduct(orderProduct.id!);
    await orderStore.clear();
    await productStore.clear();
    await userStore.delete(u.username);
  });
});
