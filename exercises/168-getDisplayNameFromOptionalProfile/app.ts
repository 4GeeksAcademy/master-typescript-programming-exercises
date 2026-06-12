interface Profile {
  firstName: string;
  nickname?: string;
}

function getDisplayName(profile: Profile): string {
  // your code here
  return profile.nickname ?? profile.firstName;
}

export {};
