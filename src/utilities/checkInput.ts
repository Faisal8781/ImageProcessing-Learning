import { isInteger } from 'lodash';

// Check and verfied it's number
export default function CheckNumber(width: number, height: number): boolean {
  return width < 0 || height < 0 || !isInteger(height) || !isInteger(width);
}
