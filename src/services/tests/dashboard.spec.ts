import { OrderProduct } from './../dashboard';
import { User, UserStore } from './../../models/user';
import { DashboardQueries } from '../dashboard';
import { Product, ProductStore } from '../../models/product';
import { ProductCategory } from '../../models/enums';
import { OrderStore } from '../../models/order';

const dashboard = new DashboardQueries();
const userStore = new UserStore();
const orderStore = new OrderStore();
const productStore = new ProductStore();

describe('Dashboard Queries', () => {
  const u: User = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'john12',
    password: 'test1234',
  };

  let p1: Product = {
    name: 'iPhone 12 Pro',
    category: ProductCategory.MOBILE_PHONES,
    price: 599,
  };
  let p2: Product = {
    name: 'iPhone 13 Pro',
    category: ProductCategory.MOBILE_PHONES,
    price: 899,
  };
  let orderProduct: OrderProduct;

  let order_id: number;

  it('should get most expensive products', async () => {
    const authUser = await userStore.create(u);
    u.id = authUser.user.id!;
    p1 = await productStore.create(p1);
    p2 = await productStore.create(p2);
    const products = await dashboard.fiveMostExpensiveProducts();
    expect(products[1].name).toEqual('iPhone 12 Pro');
  });

  it('should get products by category', async () => {
    await productStore.create({
      name: 'Lenovo Legion 5 Pro Laptop',
      category: ProductCategory.ELECTRONICS,
      price: 1299,
    });
    const products = await dashboard.getProductsByCategory(
      ProductCategory.MOBILE_PHONES
    );
    expect(products.length).toEqual(2);
  });

  it('should add product to order', async () => {
    order_id = (await orderStore.create(u.id!)).id!;
    orderProduct = await dashboard.addProductToOrder({
      product_id: p2.id!.toString(),
      order_id: order_id!.toString(),
      quantity: 2,
    });
    expect(orderProduct.quantity).toEqual(2);
  });

  it('should get products in order', async () => {
    const products = await dashboard.productsInOrder();
    expect(products[0].name).toEqual('iPhone 13 Pro');
  });

  it('should get users with orders', async () => {
    const users = await dashboard.usersWithOrders();
    expect(users[0].username).toEqual('john12');
  });

  afterAll(async () => {
    await dashboard.deleteOrderProduct(orderProduct.id!);
    await orderStore.clear();
    await productStore.clear();
    await userStore.delete(u.username);
  });
});
