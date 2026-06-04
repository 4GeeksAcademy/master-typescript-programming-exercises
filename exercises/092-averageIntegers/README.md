# `092` averageIntegers

## 📝 Instructions:

This exercise has **two functions**. Implement both in `app.ts`.

### 1. `sum`

Write a function called `sum`. Given an array of numbers, `sum` returns the total of all its elements.

### 2. `average`

Write a function called `average`. Given an array of numbers, `average` returns their average (the sum divided by how many numbers there are).

**Important:** `average` must call your `sum` function. Do not calculate the total again inside `average`.

## 📎 Examples:

**`sum`**

```ts
let total = sum([4, 5]);
console.log(total); // --> 9
```

```ts
let total = sum([4, 1, 12, 20, 1]);
console.log(total); // --> 38
```

**`average`**

```ts
let output = average([5, 8]);
console.log(output); // --> 6.5
```

```ts
let output = average([5, 15, 60, 2]);
console.log(output); // --> 20.5
```

## 💡 Hints:

+ Both functions receive an array of numbers (`number[]`) and return a `number`.
+ Reuse `sum` inside `average`: `sum(arr) / arr.length`.
+ Do not leave either function from the skeleton unused.
