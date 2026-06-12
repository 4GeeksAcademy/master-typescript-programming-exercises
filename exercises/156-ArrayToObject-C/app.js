"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformEmployeeData(array) {
    // your code here
    return array.reduce((a, e) => {
        const employee = {};
        e.forEach(([k, v]) => { employee[k] = v; });
        return [...a, employee];
    }, []);
}
