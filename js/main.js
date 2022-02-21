import {BUTTONS} from './view.js';

const DEFAULT_VALUE = "0";
let  output= document.querySelector(".output-line");
let number1;
let number2;
let operator;
let total;


function clearField() {
  output.textContent = DEFAULT_VALUE;
}

function clearVariablesData() {
  number2 = undefined;
  operator = undefined;
  total = undefined;
}

function Calc(operation, a, b) {
  const OPERATIONS = {
    "+": a + b,
    "–": a - b,
    "÷": a / b,
    "×": a * b,
  };

  let result;
  let isFullData =
    operation !== undefined && a !== undefined && b !== undefined;
  let isDivisionByZero =
    (operation === "div" && b === 0) || (operation === "rem" && b === 0);
  let isNotTypeNumber = typeof a !== "number" || typeof b !== "number";
  if (!isFullData) {
    console.log("Error!!! Вы ввели не все данные");
    return;
  } else if (isNotTypeNumber) {
    console.log("Error!!! Вы ввели не число");
    return;
  } else if (isDivisionByZero) {
    console.log("Error!!! На 0 делить нельзя");
    return;
  } else {
    result =
      OPERATIONS[operation] !== undefined
        ? OPERATIONS[operation]
        : "unknown operation";
  }
  if (operation === "÷") {
    output.textContent = result.toFixed(2);
  } else {
    output.textContent = result;
  }
  return output.textContent;
}

BUTTONS.OPERANDS_BUTTONS.forEach((element) => {
  element.addEventListener("click", () => {
    let operandContent = element.textContent;

    if (total) {
      clearField();
      clearVariablesData();
    }

    if (output.textContent === DEFAULT_VALUE) {
      output.textContent = "";
    }

      output.textContent += operandContent;
  });
});

BUTTONS.OPERATORS_BUTTONS.forEach((element) => {
  element.addEventListener("click", () => {
    let string = output.textContent;
    if (operator && string.split(operator).length === 1) {
      operator = element.querySelector(".sign").textContent;
      output.textContent += operator;
    } else if (string.split(operator).length === 2) {
      number2 = +output.textContent.split(operator)[1];
      total = Calc(operator, number1, number2);
      output.textContent = total;
      clearVariablesData();
    }
    if (total) {
      clearVariablesData();
    }
    if (!operator) {
      number1 = +output.textContent;
      operator = element.querySelector(".sign").textContent;
      if (output.textContent.includes("/+,-,÷,×/g")) {
        output.textContent.slice(output.textContent.length - 1) += operator;
      } else {
        output.textContent += operator;
      }
    }
  });
});

BUTTONS.TOTAL_BUTTON.addEventListener("click", () => {
  if (number1 && operator) {
    number2 = +output.textContent.split(operator)[1];
  }
  if (total) {
    clearField();
  } else if (!operator) {
    output.textContent = output.textContent;
  } else if (operator && number1 && !number2) {
    output.textContent = number1;
  } else if (operator && number1 && number2) {
    total = Calc(operator, number1, number2);
    if (total !== Infinity) {
      output.textContent = total;
      number1 = total;
      clearVariablesData();
    }
  } else {
    clearField();
    clearVariablesData();
  }
});

BUTTONS.RESET_BUTTON.addEventListener("click", () => {
  clearField();
  clearVariablesData();
});

BUTTONS.CLEAR_BUTTON.addEventListener("click", () => {
  let string = output.textContent;
  if (string.length > 1) {
    output.textContent = string.slice(0, string.length - 1);
  } else {
    clearField();
    clearVariablesData();
  }
});
