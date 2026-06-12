function addProperty(obj: Record<string, unknown>, key: string): {[key: string]: boolean} {
  // your code here
  obj[key] = true;
  return obj as {[key:string]: boolean};
}

export {};
