function isIsogram(text: string): boolean {
  // your code here
  return !/(.).*\1/i.test(text)
}

export {};
