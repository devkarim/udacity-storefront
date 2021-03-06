import { UserStore } from './../../models/user';
import supertest from 'supertest';
import { AuthenticatedUser, User } from '../../models/user';
import app from '../../server';
import { Order, OrderStore } from '../../models/order';
import { OrderStatus } from '../../models/enums';

const req = supertest(app);
const userStore = new UserStore();
const orderStore = new OrderStore();

describe('Order Endpoints', () => {
  const u: User = {
    username: 'john7',
    first_name: 'John',
    last_name: 'Doe',
    password: 'test123',
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

  it('should create order', async () => {
    const res = await req
      .post(`/orders`)
      .set('Authorization', `Bearer ${token}`);
    const order: Order = res.body;
    order_id = order.id!;
    expect(order.user_id).toEqual(u.id!.toString());
  });

  it('should get user orders', async () => {
    const res = await req
      .get(`/user/${u.id}/orders`)
      .set('Authorization', `Bearer ${token}`);
    const data: Order[] = res.body;
    expect(data[0].user_id).toEqual(u.id!.toString());
  });

  it('should get user completed orders (empty list)', async () => {
    const res = await req
      .get(`/user/${u.id}/orders/completed`)
      .set('Authorization', `Bearer ${token}`);
    const data: Order[] = res.body;
    expect(data.length).toEqual(0);
  });

  it('should complete order', async () => {
    const res = await req
      .post(`/order/${order_id}/complete`)
      .set('Authorization', `Bearer ${token}`);
    const completedOrder: Order = res.body;
    expect(completedOrder.status).toEqual(OrderStatus.COMPLETE);
  });

  it('should not complete orders as it does not exist', async () => {
    const res = await req
      .post(`/order/0/complete`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  });

  it('should get user completed orders', async () => {
    await orderStore.complete(order_id);
    const res = await req
      .get(`/user/${u.id}/orders/completed`)
      .set('Authorization', `Bearer ${token}`);
    const data: Order[] = res.body;
    expect(data[0].user_id).toEqual(u.id!.toString());
  });

  afterAll(async () => {
    await orderStore.delete(order_id);
    await userStore.delete(u.username);
  });
});
