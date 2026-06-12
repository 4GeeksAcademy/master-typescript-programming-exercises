function isPersonOldEnoughToDrive(person: Record<string, unknown>): boolean {
  // your code here
  return person.age ? Number(person.age) >= 16 : false;
}

export {};
