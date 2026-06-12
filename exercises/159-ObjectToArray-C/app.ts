function convertObjectToList(obj: Record<string, unknown>) {
  // your code here
  const result = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key]]);
    }
  }
  
  return result;
}

export {};
