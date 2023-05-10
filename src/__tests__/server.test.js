const request =require("supertest");
const app =require('../server.js');

describe('API tests', () => {
  let userId;
  test('should return an array when getting all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
  });

  test('should create a new user and return the created user object', async () => {
    const user = { username: 'John Doe', age: 45,hobbies:['skiing','cycling'] };
    const response = await request(app).post('/api/users').send(user);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  test('should return the created user by id', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.entityId).toEqual(userId);
  });

  test('should update the created user and return the updated user object', async () => {
    const updatedUser = { username: 'Jane Doe', age: 40,hobbies:['biking','Trekking'] };
    const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.entityId).toEqual(userId);
    expect(response.body).toMatchObject(updatedUser);
  });

  test('should delete the created user by id', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('should return an error when getting a deleted user by id', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
    expect(response.body).toBe('User not found');
  });
});
