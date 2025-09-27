// adds two numbers
function add(a, b) {
    return a + b
}
// subtracts two numbers
function subtract(a, b) {
    return a - b
}
// multiplies two numbers
function multiply(a, b) {
    return a * b
}
// divides two numbers, if possible
function divide(a, b) {
    return (() => {
        switch (b) {
            case 0: return "Cannot divide by 0";
            default: return a / b;
        }
    })()
}
// returns the result after applying operation to numbers
function operate(operator, num1, num2) {
    return (() => {
        switch(operator) {
            case "+": return add(num1, num2)
            case "-": return subtract(num1, num2)
            case "*": return multiply(num1, num2)
            case "/": return divide(num1, num2)
        }
    })()
}