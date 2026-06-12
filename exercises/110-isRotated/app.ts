function isRotated(str1: string, str2: string): boolean {
  // your code here
  if (str1 === str2) return true;
  if (!str1) return false
  const s1 = str1.split('')
  for (let i of s1){
    s1.push(s1.shift() as string)
    if (s1.join('') === str2) return true
  }
  return false;
}

export {};
