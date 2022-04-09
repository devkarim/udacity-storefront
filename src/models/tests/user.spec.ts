import { UserStore } from '../user';

const userStore = new UserStore();

describe('User Model', () => {
  it('should create user', async () => {
    const newUser = await userStore.create({
      username: 'john1',
      first_name: 'John',
      last_name: 'Doe',
      password: 'test123',
    });
    expect(newUser.user.username).toEqual('john1');
  });

  it('should authenaticate user', async () => {
    const newUser = await userStore.authenticate('john1', 'test123');
    expect(newUser?.token).toBeDefined();
  });

  it('should not authenaticate user', async () => {
    const newUser = await userStore.authenticate('john1', 'test1234');
    expect(newUser?.token).toBeFalsy();
  });

  afterAll(async () => {
    await userStore.delete('john1');
  });
});
