function or(expression1: boolean, expression2: boolean): boolean {
  // your code here
  // return expression1 ? true : expression2 ? true : false
  return !(!expression1 && !expression2);
}

export {};
