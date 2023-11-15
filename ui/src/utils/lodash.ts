export function sample<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
export function isEqual(value1: any, value2: any): boolean {
  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (typeof value1 !== "object" || value1 === null || value2 === null) {
    return value1 === value2;
  }

  const keys1: string[] = Object.keys(value1);
  const keys2: string[] = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!isEqual(value1[key], value2[key])) {
      return false;
    }
  }

  return true;
}
