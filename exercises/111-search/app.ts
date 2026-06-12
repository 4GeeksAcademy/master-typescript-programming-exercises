function search(array: number[], value: number): number | null {
  // your code here
  let l = 0, r = array.length - 1;

  while (l <= r){
    const mid = Math.floor(l+(r-l)/2);

    if (array[mid] === value) return mid;

    if (array[mid] > value) r = mid - 1;
    else l = mid + 1;
  }
  return null;
}

export {};
