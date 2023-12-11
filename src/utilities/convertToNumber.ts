// String Parameters to Number for height and width
export default function toNumber(width: string, height: string): number[] {
  return [parseInt(width), parseInt(height)];
}
