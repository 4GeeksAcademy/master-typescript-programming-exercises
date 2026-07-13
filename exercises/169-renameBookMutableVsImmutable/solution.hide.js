function renameBookImmutable(book, newTitle) {
  return { ...book, title: newTitle };
}

let book = { title: 'Old', author: 'A' };
let renamed = renameBookImmutable(book, 'New');
console.log(book.title); // --> 'Old'
console.log(renamed); // --> { title: 'New', author: 'A' }
