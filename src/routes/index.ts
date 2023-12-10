import express from 'express';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { isInteger } from 'lodash';

const routes = express.Router();

// resolve the path to be able to display it in the page
const output = path.resolve('src/thump/output.jpg');

// Create a cache to store processed images
const imageCache = new Map();

routes.get('/', (req, res) => {
  res.send('Welcome To Main API Page');
});
// The image processing function
routes.get('/images', (req, res): void => {
  const { width, height, filename } = req.query;
  // Convert width and height to numbers
  const parsedWidth = parseInt(width as string);
  const parsedHeight = parseInt(height as string);

  const cacheKey = `${width}-${height}-${filename}`;

  // Check if the processed image is already in the cache
  if (imageCache.has(cacheKey)) {
    const cachedImage = imageCache.get(cacheKey);
    res.sendFile(cachedImage);
    return;
  }

  // Image Processing Function
  try {
    fs.readFile(`src/images/${filename}.jpg`, (err, data) => {
      // Generate Error and display it if there are non positive number
      if (
        parsedWidth < 0 ||
        parsedHeight < 0 ||
        !isInteger(parsedHeight) ||
        !isInteger(parsedWidth)
      ) {
        res.send('Invlid Input Please inter positive number only');
      } else {
        if (err) {
          console.error(err);
        } else {
          sharp(data)
            .resize(parsedWidth, parsedHeight)
            .toFile(output, (err, info) => {
              if (err) {
                console.error(err);
              } else {
                // Store the processed image in the cache
                imageCache.set(cacheKey, output);

                res.sendFile(output);
              }
            });
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

export default routes;
