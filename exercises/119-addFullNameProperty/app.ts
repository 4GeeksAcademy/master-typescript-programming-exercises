function addFullNameProperty(obj: Record<string, unknown>): {[key:string]: string} {
  // your code here
  obj.fullName = `${obj.firstName} ${obj.lastName}`
  return obj as {[key:string]: string}
}

export {};
