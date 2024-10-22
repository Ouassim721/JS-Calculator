const clearBtn = document.getElementById("clear");
const viewer = document.getElementById("viewer");
const upViewer = document.getElementById("upViewer");
const numBtns = document.querySelectorAll(".num");
const opBtns = document.querySelectorAll(".ops");

//initialize the variables
let currentNumber = "";
let previousNumber = "";
let operator = "";
let result = "";

//update the main viewer
function updateViewer(value) {
  viewer.innerText = value;
}

//update the equation display
function updateUpViewer() {
  upViewer.innerText =
    previousNumber + " " + operatorToSymbol(operator) + " " + currentNumber;
}

//update the equation display + "="
function updateUpViewerEq() {
  upViewer.innerText =
    previousNumber +
    " " +
    operatorToSymbol(operator) +
    " " +
    currentNumber +
    " =";
}

//Convert operator name to its symbol
function operatorToSymbol(op) {
  switch (op) {
    case "plus":
      return "+";
    case "minus":
      return "-";
    case "times":
      return "×";
    case "divided by":
      return "÷";
    default:
      return "";
  }
}

//Handle number button clicks
numBtns.forEach((button) => {
  button.addEventListener("click", function () {
    let num = this.getAttribute("data-num");
    if (num === "." && currentNumber.includes(".")) return;
    currentNumber += num;
    updateViewer(currentNumber);
    updateUpViewer();
  });
});

//Handle operator button clicks
opBtns.forEach((button) => {
  button.addEventListener("click", function () {
    let operation = this.getAttribute("data-ops");

    if (operation === "equals") {
      if (previousNumber && currentNumber && operator) {
        calculate();
        updateViewer(result);
        updateUpViewerEq();
        currentNumber = result.toString();
        previousNumber = "";
        operator = "";
      }
    } else {
      if (!currentNumber && !previousNumber) return;

      if (!currentNumber && previousNumber) {
        operator = operation;
        updateUpViewer();
        return;
      }

      if (previousNumber && currentNumber && operator) {
        calculate();
        updateViewer(result);
        previousNumber = result.toString();
      } else {
        previousNumber = currentNumber;
      }

      operator = operation;
      currentNumber = "";
      updateUpViewer();
    }
  });
});

//Function that calculates the result
function calculate() {
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);

  switch (operator) {
    case "plus":
      result = num1 + num2;
      break;
    case "minus":
      result = num1 - num2;
      break;
    case "times":
      result = num1 * num2;
      break;
    case "divided by":
      result = num2 === 0 ? "Erreur" : num1 / num2;
      break;
    default:
      result = currentNumber;
      break;
  }
}

//Clear calculator by clicking the C button
clearBtn.addEventListener("click", function () {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  result = "";
  updateViewer(0);
  updateUpViewer();
});
