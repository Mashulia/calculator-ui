let output = document.querySelector(".output-line");
const operands = document.querySelectorAll(".button-operand");
const operators = document.querySelectorAll(".button-operator");
const resetButton = document.querySelector(".button-reset-all");
const clearButton = document.querySelector(".button-clear");
const signOperations = document.querySelector(".sign");
const totalButton = document.querySelector(".button-total");
let number1;
let number2;
let operator;
let total;

function clearField() {
  output.textContent = 0;
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
  output.textContent = result;
  return output.textContent;
}

operands.forEach((element) => {
  element.addEventListener("click", () => {
    if (total !== undefined) {
      total = undefined;
      output.textContent = "0";
    }

    if (output.textContent === "0") {
      output.textContent = "";
    }

    let operandContent = element.textContent;
    output.textContent += operandContent;
  });
});

operators.forEach((element) => {
  element.addEventListener("click", () => {
    number1 = +output.textContent;

    sign = element.querySelector(".sign").textContent;
    operator = sign;
    console.log(operator);
    output.textContent += operator;
  });
});

totalButton.addEventListener("click", () => {
  if (number1 !== undefined && operator !== undefined) {
    number2 = +output.textContent.split(sign)[1];
  }

  total = Calc(operator, number1, number2);
  console.log(output.textContent);
  if (total !== undefined) {
    output.textContent = total;
  } else {
    clearField();
  }
});

resetButton.addEventListener("click", () => {
  clearField();
  number1 = undefined;
  number2 = undefined;
  operator = undefined;
});

clearButton.addEventListener("click", () => {
  let string = output.textContent;
  if (string.length > 1) {
    output.textContent = string.slice(0, string.length - 1);
  } else {
    output.textContent = "0";
  }
});
