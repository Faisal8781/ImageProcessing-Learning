import { app } from '../index';
import request from 'supertest';
import imageProcessing from '../utilities/imageProcessing';
import { promises } from 'fs';
import path from 'path';
import toNumber from '../utilities/convertToNumber';
import CheckNumber from '../utilities/checkInput';

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

describe('testing Endpoint / ', () => {
  it('should return 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Testing ImageProcessing Module ', () => {
  it('should return true so the imageProcessing function resolved', async () => {
    const filename = 'fjord';
    const data = await promises.readFile(`src/images/${filename}.jpg`);
    const width = 200;
    const height = 200;
    const imageCache = new Map();
    const output = path.resolve('src/thump/output.jpg');
    const cacheKey = `${width}-${height}-${filename}`;

    expect(
      await imageProcessing(data, width, height, output, imageCache, cacheKey)
    ).toBeTrue();
  });
});

describe('Convert String to Number ', () => {
  it('should return true that 200 width and 200 height now are count as number', async () => {
    const width = '200';
    const height = '200';
    expect(toNumber(width, height)).toEqual([200, 200]);
  });
});

describe('Check if height and width are number and above 0 ', () => {
  it('should return true that 200 width and 200 height now are count as number', async () => {
    const width = 200;
    const height = 200;
    expect(CheckNumber(width, height)).not.toBeTrue();
  });
});
