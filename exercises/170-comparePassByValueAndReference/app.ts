interface ComparisonResult {
  original: unknown;
  copy: unknown;
  sameReference: boolean;
}

function comparePassByValueAndReference(input: unknown): ComparisonResult {
  // your code here
  return {externalCount: input.count} as ComparisonResult;
}

export {};
