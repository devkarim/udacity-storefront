import { OrderStatus } from '../enums';
import { OrderStore } from '../order';
import { AuthenticatedUser, UserStore } from '../user';

const userStore = new UserStore();
const orderStore = new OrderStore();

describe('Order Model', () => {
  let id: number | undefined;

  it('should create order', async () => {
    const newUser = await userStore.create({
      username: 'john3',
      first_name: 'John',
      last_name: 'Doe',
      password: 'test123',
    });
    const order = await orderStore.create(newUser.user.id!);
    id = order.id;
    expect(order.status).toEqual(OrderStatus.ACTIVE);
  });

  it('should get current orders of user', async () => {
    const user = await userStore.getByName('john3');
    const order = await orderStore.getCurrentByUser(user.id!);
    expect(parseInt(order[0].user_id as unknown as string)).toEqual(user.id!);
  });

  it('should complete order', async () => {
    const order = await orderStore.complete(id!);
    expect(order.status).toEqual(OrderStatus.COMPLETE);
  });

  it('should get completed orders of user', async () => {
    const user = await userStore.getByName('john3');
    const order = await orderStore.getCompletedByUser(user.id!);
    expect(order[0].status).toEqual(OrderStatus.COMPLETE);
  });

  afterAll(async () => {
    await orderStore.clear();
    await userStore.delete('john3');
  });
});
