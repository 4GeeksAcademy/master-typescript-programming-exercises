interface Book {
  title: string;
  author: string;
}

function renameBookImmutable(book: Book, newTitle: string): Book {
  // your code here
  return {...book, title: newTitle} as Book;
}

export {};
