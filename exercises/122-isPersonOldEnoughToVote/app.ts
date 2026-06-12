function isPersonOldEnoughToDrive(person: Record<string, unknown>): boolean {
  // your code here
  return person.age ? Number(person.age) >= 16 : false;;
}

function isPersonOldEnoughToVote(a: Record<string, unknown>): boolean {
  // your code here
  return a.age ? Number(a.age) >= 18 : false;;
}

export {};
