"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPersonOldEnoughToDrive(person) {
    // your code here
    return person.age ? Number(person.age) >= 16 : false;
}
