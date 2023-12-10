import { app } from '../index';
import request from 'supertest';
describe('testing Endpoint /api and /api/images?filename:****&width=000&height=000', () => {
  it('should return 200 status code', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });
  it('should return 200 status code', async () => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 200, height: 200, filename: 'fjord' });
    expect(response.status).toBe(200);
  });
});

describe('Image Incorrect input file type test..', () => {
  it('Correct Input File type', async () => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: 200, height: 200, filename: 'fjord' });
    expect(response.type).toBe('image/jpeg');
  });
});

describe('Image Incorrect input parameters type test..', () => {
  it('incorrect input of parameters', async () => {
    const response = await request(app)
      .get('/api/images')
      .query({ width: '200', height: '200', filename: 'fjord' });
    expect(response.error);
  });
});
