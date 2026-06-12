"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let customerData = {
    'Joe': {
        visits: 1
    },
    'Carol': {
        visits: 2
    },
    'Howard': {
        visits: 3
    },
    'Carrie': {
        visits: 4
    }
};
function greetCustomer(firstName) {
    // your code here
    if (!customerData[firstName])
        return 'Welcome! Is this your first time?';
    if (customerData[firstName].visits === 1)
        return `Welcome back, ${firstName}! We're glad you liked us the first time!`;
    if (customerData[firstName].visits > 1)
        return `Welcome back, ${firstName}! So glad to see you again!`;
    return '';
}
