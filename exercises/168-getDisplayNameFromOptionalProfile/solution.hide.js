function getDisplayName(profile) {
  return profile.nickname ?? profile.firstName;
}

console.log(getDisplayName({ firstName: 'Ana', nickname: 'Annie' })); // --> 'Annie'
console.log(getDisplayName({ firstName: 'Ana' })); // --> 'Ana'
