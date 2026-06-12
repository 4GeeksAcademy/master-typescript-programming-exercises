function isPersonOldEnoughToDrink(person: Record<string, unknown>): boolean {
  // your code here
  return person.age ? Number(person.age) >= 21 : false;;
}

export {};
