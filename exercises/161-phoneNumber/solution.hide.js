class PhoneNumberFormatter {
  constructor(numbers) {
    this.numbers = numbers;
  }
  render() {
    let string = '';
    string = this.parenthesize(this.getAreaCode()) + " " + this.getExchangeCode() + "-" + this.getLineNumber();
    return string;
  }
  getAreaCode() {
    return this.slice(0, 3);
  }
  getExchangeCode() {
    return this.slice(3, 6);
  }
  getLineNumber() {
    return this.slice(6, 10);
  }
  parenthesize(string) {
    return '(' + string + ')';
  }
  slice(start, end) {
    return this.numbers.slice(start, end).join('');
  }
}
  
  
  
  
  
  
  
  let number = new PhoneNumberFormatter([6,5,0,8,3,5,9,1,7,2]);
  console.log(number.render()); // --> "(650) 835-9172"
