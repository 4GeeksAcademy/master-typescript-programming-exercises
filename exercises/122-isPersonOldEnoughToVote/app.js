"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPersonOldEnoughToDrive(person) {
    // your code here
    return person.age ? Number(person.age) >= 16 : false;
    ;
}
function isPersonOldEnoughToVote(a) {
    // your code here
    return a.age ? Number(a.age) >= 18 : false;
    ;
}
