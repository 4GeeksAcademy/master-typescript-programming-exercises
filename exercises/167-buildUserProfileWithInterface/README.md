# `167` buildUserProfileWithInterface

## 📝 Instructions:

1. Write a function called `buildUserProfile`. Given a user's `name` and `age`, `buildUserProfile` returns a `UserProfile` object with these properties:

   - `name`: the given name
   - `age`: the given age
   - `isAdult`: `true` if age is 18 or older, otherwise `false`

2. Use the `UserProfile` interface already defined in `app.ts`.

## 📎 Example:

```ts
let output = buildUserProfile('Leo', 20);
console.log(output); // --> { name: 'Leo', age: 20, isAdult: true }
```

```ts
let output = buildUserProfile('Mia', 15);
console.log(output); // --> { name: 'Mia', age: 15, isAdult: false }
```

## 💡 Hints:

+ Return a new object that matches the `UserProfile` interface.
+ `isAdult` can be computed with `age >= 18`.
