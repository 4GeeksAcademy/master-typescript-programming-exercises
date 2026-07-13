function binarySearchSortedArray(values, target) {
  let start = 0;
  let end = values.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (values[mid] === target) return mid;
    if (values[mid] < target) start = mid + 1;
    else end = mid - 1;
  }

  return -1;
}

console.log(binarySearchSortedArray([1, 3, 5, 7, 9], 7)); // --> 3
console.log(binarySearchSortedArray([1, 3, 5, 7, 9], 2)); // --> -1
