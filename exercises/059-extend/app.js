"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extend(obj1, obj2) {
    // your code here
    for (let pro in obj2) {
        if (!(pro in obj1)) {
            obj1[pro] = obj2[pro];
        }
    }
    return obj1;
}
