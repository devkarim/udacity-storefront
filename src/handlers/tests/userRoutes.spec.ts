import { UserStore } from './../../models/user';
import supertest from 'supertest';
import { AuthenticatedUser, User } from '../../models/user';
import app from '../../server';

const req = supertest(app);
const userStore = new UserStore();

describe('User Endpoints', () => {
  const u: User = {
    username: 'john4',
    first_name: 'John',
    last_name: 'Doe',
    password: 'test123',
  };

  const u2: User = {
    username: 'john5',
    first_name: 'John',
    last_name: 'Doe',
    password: 'test123',
  };

  let token: string;

  it('should create user', async () => {
    const res = await req.post('/users/signup').send(u);
    const data: AuthenticatedUser = res.body;
    u.id = data.user.id!;
    expect(data.token).toBeDefined();
  });

  it('should create another user', async () => {
    const res = await req.post('/users/signup').send(u2);
    const data: AuthenticatedUser = res.body;
    u2.id = data.user.id!;
    expect(data.token).toBeDefined();
  });

  it('should authenticate user', async () => {
    const res = await req
      .post('/users/authenticate')
      .send({ username: u.username, password: u.password });
    const data: AuthenticatedUser = res.body;
    token = data.token;
    expect(data.user.username).toEqual('john4');
  });

  it('should not authenticate user', async () => {
    const res = await req
      .post('/users/authenticate')
      .send({ username: u.username, password: 'randompass' });
    expect(res.statusCode).toEqual(400);
  });

  it('should show all users when authenticated', async () => {
    const res = await req.get('/users').set('Authorization', `Bearer ${token}`);
    const data: User[] = res.body;
    expect(data[0].first_name).toBeDefined();
  });

  it('should not show all users when not authenticated', async () => {
    const res = await req
      .get('/users')
      .set('Authorization', `Bearer xx${token}xx`);
    const data: User[] = res.body;
    expect(res.statusCode).toEqual(401);
  });

  it('should get specific user when authenticated', async () => {
    const res = await req
      .get(`/users/${u2.id}`)
      .set('Authorization', `Bearer ${token}`);
    const data: User = res.body;
    expect(data.username).toEqual(u2.username);
  });

  afterAll(async () => {
    await userStore.delete(u.username);
    await userStore.delete(u2.username);
  });
});
