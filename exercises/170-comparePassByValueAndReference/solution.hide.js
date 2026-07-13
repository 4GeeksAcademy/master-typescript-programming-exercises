function comparePassByValueAndReference(input) {
  if (typeof input === 'object' && input !== null) {
    const copy = { ...input };
    return {
      original: input,
      copy,
      sameReference: input === copy,
    };
  }

  const copy = input;
  return {
    original: input,
    copy,
    sameReference: input === copy,
  };
}

let item = { count: 1 };
console.log(comparePassByValueAndReference(item).sameReference); // --> false
console.log(comparePassByValueAndReference(5).sameReference); // --> true
