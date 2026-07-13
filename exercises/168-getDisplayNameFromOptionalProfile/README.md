# `168` getDisplayNameFromOptionalProfile

## 📝 Instructions:

1. Write a function called `getDisplayName`. Given a `Profile` object, `getDisplayName` returns the name to display:

   - If `nickname` is provided, return the nickname.
   - Otherwise, return `firstName`.

2. Use the `Profile` interface already defined in `app.ts` (note that `nickname` is optional).

## 📎 Example:

```ts
let output = getDisplayName({ firstName: 'Ana', nickname: 'Annie' });
console.log(output); // --> 'Annie'
```

```ts
let output = getDisplayName({ firstName: 'Ana' });
console.log(output); // --> 'Ana'
```

## 💡 Hints:

+ An optional property may be missing from the object.
+ You can use `profile.nickname ?? profile.firstName` or an `if` statement.
