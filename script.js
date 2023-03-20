"use strict";
const buttons = document.querySelectorAll(".button");
const topDisplay = document.querySelector(".top-display")
const bottomDisplay = document.querySelector('.bottom-display')
const decimalButton = document.querySelector('.decimal')

let digits = [];
let operators = [];
let digitString = "";

buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    let elemDataClass = elem.getAttribute("data-class");
    if (elemDataClass === "digit") {
      if (digitString.includes('.')) decimalButton.style.pointerEvents='none';
      else decimalButton.style.pointerEvents='auto';
      digitString += elem.innerHTML;
      bottomDisplay.innerHTML = digitString;

    } else if (elemDataClass === "operator") {
      if (digitString) {
        console.log(digitString)
        digits.push(digitString);
        digitString = "";
      }
      operators.push(elem.innerHTML);

      if (operators.length > 1 && digits.length <= 1) operators = [elem.innerHTML];
      if (operators.length >= 1 && digits.length == 0) digits.push(0);
      if (operators.length == 1 && operators[0] == "=") {
        operators = [];
        digits = [digits[0]];
      } else {
        topDisplay.innerHTML = digits[0] + operators[0]
        bottomDisplay.innerHTML = ''
      }

      if (digits.length >= 2 && operators.length >= 1) {
        let calc = calculate(
          Number(digits[0]),
          operators[0],
          Number(digits[1])
        );
          if (calc == Infinity) {
            topDisplay.innerHTML = ''
            bottomDisplay.innerHTML = 'Error'
            digits = []
          } else{
          topDisplay.innerHTML = digits[0] + operators[0] + digits[1] + ' ='
          bottomDisplay.innerHTML = calc
          digits = []
          digitString = String(calc)
          if (elem.innerHTML == "=") operators = [];
          else {
              digits = [calc]
              operators = [elem.innerHTML];
              digitString = ''
              topDisplay.innerHTML = calc + operators[0]
              bottomDisplay.innerHTML = ''
          }
        }
      }
    } else {
       if (elem.innerHTML == 'A') {
        digitString = digitString.slice(0, -1)
        bottomDisplay.innerHTML = digitString
      } else if (elem.innerHTML == 'AC'){
        digitString = ''
        digits = []
        operators = []
        bottomDisplay.innerHTML = ''
        topDisplay.innerHTML = ''
      } else {
          if (digits.length == 1 && operators.length == 0){
            console.log(digits[0])
            if (Math.sign(digits[0]) == 1) digits[0] = '-' + digits[0]
            else digits[0] = digits[0].slice(1)
            bottomDisplay.innerHTML = digits[0]
          } else {
              if (Math.sign(digitString) == 1) digitString = '-' + digitString
              else digitString = digitString.slice(1)
              bottomDisplay.innerHTML = digitString
          }
      }
    } 
  });
});
function calculate(firstDigit, operator, secondDigit) {
  console.log(firstDigit, operator, secondDigit)
  if (operator == "+") return firstDigit + secondDigit;
  else if (operator == "-") return firstDigit - secondDigit;
  else if (operator == "%") return firstDigit % secondDigit;
  else if (operator == "÷") return firstDigit / secondDigit;
  else if (operator == "*") return firstDigit * secondDigit;
}
