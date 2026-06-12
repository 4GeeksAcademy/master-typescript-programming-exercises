"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromListToObject(array) {
    return array.reduce((a, [k, v]) => {
        a[k] = v;
        return a;
    }, {});
}
