# `170` comparePassByValueAndReference

## 📝 Instructions:

1. Write a function called `comparePassByValueAndReference`. Given an `input` value, the function returns a `ComparisonResult` object with:

   - `original`: the input value received
   - `copy`: a copy of the input (for objects, create a shallow copy with the spread operator)
   - `sameReference`: `true` if `copy` and `original` point to the same reference, otherwise `false`

2. Use the `ComparisonResult` interface already defined in `app.ts`.

## 📎 Example (object — pass by reference):

```ts
let item = { count: 1 };
let output = comparePassByValueAndReference(item);
console.log(output.sameReference); // --> false
console.log(output.original === output.copy); // --> false
```

If you change `output.copy.count`, `item.count` stays `1` because `copy` is a different object.

## 📎 Example (number — pass by value):

```ts
let output = comparePassByValueAndReference(5);
console.log(output.original); // --> 5
console.log(output.copy); // --> 5
console.log(output.sameReference); // --> true
```

## 💡 Hints:

+ For objects: `const copy = { ...input }` creates a new object (`sameReference` is `false`).
+ For primitives (numbers, strings, booleans): assigning `copy = input` copies the value (`sameReference` is `true`).
+ Use `input === copy` to check if both variables refer to the same reference.
