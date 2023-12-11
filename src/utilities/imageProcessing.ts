import sharp from 'sharp';

// ImageProcessing Function and set Cache
export default async function imageProcessings(
  file: Buffer,
  width: number,
  height: number,
  output: string,
  imageCache: Map<string, string>,
  cacheKey: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sharp(file)
      .resize(width, height)
      .toFile(output, (err, info) => {
        if (err) {
          reject(err);
        } else {
          imageCache.set(cacheKey, output);
          resolve(true);
        }
      });
  });
}
