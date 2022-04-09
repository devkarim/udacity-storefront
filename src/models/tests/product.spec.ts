import { ProductCategory } from '../enums';
import { ProductStore } from '../product';
import { UserStore } from '../user';

const productStore = new ProductStore();

describe('Product Model', () => {
  let id: number | undefined;
  it('should create product', async () => {
    const product = await productStore.create({
      name: 'iPhone 13 Pro',
      category: ProductCategory.MOBILE_PHONES,
      price: 899,
    });
    id = product.id;
    expect(product.price).toEqual(899);
  });

  it('should fetch all products', async () => {
    const products = await productStore.index();
    expect(products.length).toEqual(1);
  });

  it('should get product', async () => {
    const product = await productStore.get(id!);
    expect(product.name).toEqual('iPhone 13 Pro');
  });

  afterAll(async () => {
    await productStore.clear();
  });
});
