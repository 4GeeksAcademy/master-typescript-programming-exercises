interface CustomerData {
  [key: string]: {
    visits: number
  }
};

let customerData: CustomerData = {
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

function greetCustomer(firstName: string): string {
  // your code here
  return '';
}

export {};
