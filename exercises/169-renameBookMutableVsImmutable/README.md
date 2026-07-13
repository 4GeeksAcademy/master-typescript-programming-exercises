# `169` renameBookMutableVsImmutable

## 📝 Instructions:

1. Write a function called `renameBookImmutable`. Given a `Book` object and a `newTitle`, `renameBookImmutable` returns a **new** book object with the updated title.

2. The **original** book must not be modified.

3. Use the `Book` interface already defined in `app.ts`.

## 📎 Example:

```ts
let book = { title: 'Old', author: 'A' };
let renamed = renameBookImmutable(book, 'New');
console.log(book.title); // --> 'Old'
console.log(renamed); // --> { title: 'New', author: 'A' }
```

## 💡 Hints:

+ Use the spread operator `{ ...book, title: newTitle }` to create a shallow copy with one changed property.
+ Do not assign directly to `book.title` inside the function.
