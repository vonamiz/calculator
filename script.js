let display = document.getElementById("display");
let currentValue = "";
let firstNumber = "";
let secondNumber = "";
let operator = "";

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        const action = this.getAttribute("data-action");
        const number = this.getAttribute("data-number");

        if (number !== null) {
            currentValue += number;
            display.textContent = currentValue;
        } else if (action === "clear") {
            display.textContent = "0";
            currentValue = ""; 
        } else if (action === "backspace") {
            currentValue = currentValue.slice(0, -1);
            display.textContent = currentValue || "0";
        } else if (["add", "subtract", "multiply", "divide"].includes(action)) {
            if (currentValue !== "") {
                firstNumber = currentValue;
                operator = action;
                currentValue = "";
            }
        } else if (action === "equals") {
            if (firstNumber !== "" && currentValue !== "" && operator !== "") {
                secondNumber = currentValue;
                let result = calculate(parseFloat(firstNumber), parseFloat(secondNumber), operator); 
                display.textContent = result;
                currentValue = result; 
                firstNumber = "";
                secondNumber = "";
                operator = "";
            }
        } else if (action === "decimal" && !currentValue.includes(".")) {
            currentValue += ".";
            display.textContent = currentValue;
        }

        console.log("Отладка: ", firstNumber, operator, currentValue); 
    });
});

function calculate(a, b, op) {
    switch (op) {
        case "add": return a + b;
        case "subtract": return a - b;
        case "multiply": return a * b;
        case "divide": return b === 0 ? "Ошибка" : a / b;
        default: return 0;
    }
}