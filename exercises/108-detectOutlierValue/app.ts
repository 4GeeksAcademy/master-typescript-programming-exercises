function detectOutlierValue(string: string): number {
  // your code here
  let even = 0, odd = 0;
  const numbers = string.split(' ').map(e=>+e);
  
  for (let i of numbers){
    i % 2 === 0 ? even++ : odd++;
  }

  if (even > odd){
    for (let i = 0; i < numbers.length; i++){
      if (numbers[i] % 2 !== 0) return i+1;
    }
  } else {
    for (let i = 0; i < numbers.length; i++){
      if (numbers[i] % 2 === 0) return i+1;
    }
  }
  return -1;
}

export {};
