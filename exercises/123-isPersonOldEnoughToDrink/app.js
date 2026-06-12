"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPersonOldEnoughToDrink(person) {
    // your code here
    return person.age ? Number(person.age) >= 21 : false;
    ;
}
