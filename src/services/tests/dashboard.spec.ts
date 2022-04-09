import { UserStore } from './../../models/user';
import { DashboardQueries } from '../dashboard';
import { ProductStore } from '../../models/product';
import { ProductCategory } from '../../models/enums';

const dashboard = new DashboardQueries();
const productStore = new ProductStore();

describe('Dashboard Queries', () => {
  it('should get most expensive products', async () => {
    await productStore.create({
      name: 'iPhone 12 Pro',
      category: ProductCategory.MOBILE_PHONES,
      price: 599,
    });
    await productStore.create({
      name: 'iPhone 13 Pro',
      category: ProductCategory.MOBILE_PHONES,
      price: 899,
    });
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

  afterAll(async () => {
    await productStore.clear();
  });
});
