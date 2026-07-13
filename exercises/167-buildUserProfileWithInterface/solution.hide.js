function buildUserProfile(name, age) {
  return {
    name,
    age,
    isAdult: age >= 18,
  };
}

console.log(buildUserProfile('Leo', 20)); // --> { name: 'Leo', age: 20, isAdult: true }
