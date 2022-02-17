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

function clearVariablesData() {
  number1 = undefined;
  number2 = undefined;
  operator = undefined;
  total = undefined;
}

function reduceFont() {
  if (output.textContent.length > 5) {
    output.style.fontSize = "45px";
    output.style.lineHeight = "50px";
  }
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

operands.forEach((element) => {
  element.addEventListener("click", () => {
    let operandContent = element.textContent;

    if (total) {
      clearField();
      clearVariablesData();
    }

    if (output.textContent === "0") {
      output.textContent = "";
    }

    output.textContent += operandContent;
  });
});

operators.forEach((element) => {
  element.addEventListener("click", () => {
    const isContainSign =
      output.textContent.indexOf("+") !== -1 ||
      output.textContent.indexOf("-") !== -1 ||
      output.textContent.indexOf("÷") !== -1 ||
      output.textContent.indexOf("×") !== -1;
    if (total) {
      clearVariablesData();
    }
    if (!operator) {
      number1 = +output.textContent;
      operator = element.querySelector(".sign").textContent;
      output.textContent += operator;
    } else if (isContainSign) {
      operator = element.querySelector(".sign").textContent;
      output.textContent[output.textContent.length - 1] = operator;
    }
  });
});

totalButton.addEventListener("click", () => {
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
    }
  } else {
    clearField();
  }
});

resetButton.addEventListener("click", () => {
  clearField();
  clearVariablesData();
});

clearButton.addEventListener("click", () => {
  let string = output.textContent;
  if (string.length > 1) {
    output.textContent = string.slice(0, string.length - 1);
  } else {
    clearField();
    clearVariablesData();
  }
});
