function addArrayProperty(obj: Record<string, unknown>, key: string, arr: unknown[]) {
  // your code here
  obj[key] = arr;
  return obj;
}

export {};
