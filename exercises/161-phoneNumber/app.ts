function PhoneNumberFormatter(numbers: number[]) {
    this.numbers = numbers;
  }
  
  PhoneNumberFormatter.prototype.render = function() {
    let string = '';
    // your code here
    string = this.parenthesize(this.getAreaCode()) + " " + this.getExchangeCode() + "-" + this.getLineNumber();
    return string;
  };
  
  PhoneNumberFormatter.prototype.getAreaCode = function() {
    // your code here
    return this.slice(0,3);
  };
  
  PhoneNumberFormatter.prototype.getExchangeCode = function() {
    // your code here
    return this.slice(3,6);
  };
  
  PhoneNumberFormatter.prototype.getLineNumber = function() {
    // your code here
    return this.slice(6,10);
  };
  
  PhoneNumberFormatter.prototype.parenthesize = function(string) {
    return '(' + string + ')';
  };
  
  PhoneNumberFormatter.prototype.slice = function(start, end) {
    return this.numbers.slice(start, end).join('');
  };
  

export {};
