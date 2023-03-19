"use strict";
const buttons = document.querySelectorAll(".button");

let digits = [];
let operators = [];
let digitString = "";
let displayTopString = ''
let displayBottomSring = ''

buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    let elemDataClass = elem.getAttribute("data-class");
    if (elemDataClass === "digit") {
      console.log(elem.innerHTML);
      digitString += elem.innerHTML;
    } else if (elemDataClass === "operator") {
      if (digitString) {
        digits.push(digitString);
        digitString = "";
      }
      operators.push(elem.innerHTML);
      if (operators.length > 1 && digits.length <= 1)
        operators = [elem.innerHTML];
      if (operators.length == 1 && operators[0] == "=") {
        operators = [];
        digits = [digits[0]];
      }
      console.log(digits.length, digits, operators.length);
      if (digits.length >= 2 && operators.length >= 1) {
        let calc = calculate(
          Number(digits[0]),
          operators[0],
          Number(digits[1])
        );
        digits = [calc];
        if (elem.innerHTML == "=") operators = [];
        else operators = [elem.innerHTML];
      }
    }
  });
});
function calculate(firstDigit, operator, secondDigit) {
  if (operator == "+") return firstDigit + secondDigit;
  else if (operator == "-") return firstDigit - secondDigit;
  else if (operator == "%") return firstDigit % secondDigit;
  else if (operator == "÷") return firstDigit / secondDigit;
  else if (operator == "*") return firstDigit * secondDigit;
}
