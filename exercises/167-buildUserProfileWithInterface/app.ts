interface UserProfile {
  name: string;
  age: number;
  isAdult: boolean;
}

function buildUserProfile(name: string, age: number): UserProfile {
  // your code here
  return {name, age, isAdult: age >= 18} as UserProfile;
}

export {};
