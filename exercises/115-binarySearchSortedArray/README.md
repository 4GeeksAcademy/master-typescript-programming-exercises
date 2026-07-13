# `115` binarySearchSortedArray

## 📝 Instructions:

1. Write a function called `binarySearchSortedArray`. Given a **sorted** array of numbers and a target value, `binarySearchSortedArray` returns the **index** of the target if it is found.

2. If the target is not in the array, return `-1`.

## 📎 Example:

```ts
let output = binarySearchSortedArray([1, 3, 5, 7, 9], 7);
console.log(output); // --> 3
```

```ts
let output = binarySearchSortedArray([1, 3, 5, 7, 9], 2);
console.log(output); // --> -1
```

## 💡 Hints:

+ **Binary search** works on sorted arrays by repeatedly dividing the search range in half.
+ Use `Math.floor()` when calculating the midpoint index.
+ Compare the midpoint value with the target to decide whether to search the left or right half.
