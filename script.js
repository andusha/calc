"use strict";
const buttons = document.querySelectorAll(".button");
const topDisplay = document.querySelector(".top-display")
const bottomDisplay = document.querySelector('.bottom-display')

let digits = [];
let operators = [];
let digitString = "";
let displayTopString = ''

buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    let elemDataClass = elem.getAttribute("data-class");
    if (elemDataClass === "digit") {
      console.log(elem.innerHTML);
      digitString += elem.innerHTML;
      bottomDisplay.innerHTML += elem.innerHTML;
    } else if (elemDataClass === "operator") {
      if (digitString) {
        digits.push(digitString);
        digitString = "";
      }
      operators.push(elem.innerHTML);

      if (operators.length > 1 && digits.length <= 1) operators = [elem.innerHTML];
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
        topDisplay.innerHTML = digits[0] + operators[0] + digits[1] + ' ='
        bottomDisplay.innerHTML = calc
        digits = [calc];
        if (elem.innerHTML == "=") operators = [];
        else {
            operators = [elem.innerHTML];
            topDisplay.innerHTML = digits[0] + operators[0]
            bottomDisplay.innerHTML = ''
        }
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
