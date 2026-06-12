function binarySearchSortedArray(values: number[], target: number): number {
  // your code here
  let l = 0, r = values.length - 1;

  while (l <= r){
    const mid = Math.floor(l+(r-l)/2);

    if (values[mid] === target) return mid;

    if (values[mid] > target) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
}

export {};
