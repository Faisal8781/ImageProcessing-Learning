import express from 'express';
import { promises } from 'fs';
import path from 'path';
import imageProcessing from '../utilities/imageProcessing';
import CheckNumber from '../utilities/checkInput';
import toNumber from '../utilities/convertToNumber';
const routes = express.Router();

// resolve the path to be able to display it in the page
const output = path.resolve('src/thump/output.jpg');

// Create a cache to store processed images
const imageCache = new Map();

routes.get('/', (req, res) => {
  res.send('Welcome To Main API Page');
});
// The image processing function
routes.get('/images', async (req, res): Promise<void> => {
  const { width, height, filename } = req.query;

  // Convert width and height to numbers
  // const parsedWidth = parseInt(width as string);
  // const parsedHeight = parseInt(height as string);

  const [parsedWidth, parsedHeight] = toNumber(
    width as string,
    height as string
  );

  const cacheKey = `${parsedWidth}-${parsedHeight}-${filename as string}`;

  // Check if the processed image is already in the cache
  if (imageCache.has(cacheKey)) {
    const cachedImage = imageCache.get(cacheKey);
    res.sendFile(cachedImage);
  } else {
    // Image Processing Function
    try {
      const data = await promises.readFile(
        `src/images/${filename as string}.jpg`
      );

      // Generate Error and display it if there are non positive number
      // Oppisite way
      if (CheckNumber(parsedWidth, parsedHeight)) {
        res.send('Invlid Input Please inter positive number only');
      } else {
        // ImageProcessing Function
        if (
          await imageProcessing(
            data,
            parsedWidth,
            parsedHeight,
            output,
            imageCache,
            cacheKey
          )
        ) {
          res.sendFile(output);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
});

export default routes;
