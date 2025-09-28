// CALCULATION FUNCTIONS

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


// HTML FUNCTIONS

// returns a container class of button elements
function getButtonContainer(listSlice) {
    let container = document.createElement("div")
    container.setAttribute("class", "buttonContainer")
    container.append(...listSlice)
    return container
}

// returns an html button element with click listener
function createButton(n) {
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        document.getElementById("display").textContent = n
    })
    button.textContent = n
    return button
}

// displays 3 rows of containers with calculator buttons
function createCalcButtons(calculator) {
    let buttonList = Array.apply(null, Array(9)).map((e, i) => createButton(i+1))
    for (let i = 9; i > 0; i -= 3) {
        let listSlice = buttonList.slice(i-3, i)
        let buttonContainer = getButtonContainer(listSlice)
        calculator.append(buttonContainer)
    }
}

// creates user input display class element
function createCalcDisplay(calculator) {
    let display = document.createElement("div")
    display.setAttribute("id", "display")
    display.textContent = "|"
    calculator.append(display)
}

// displays calculator to screen
function createCalculator() {
    let calculator = document.createElement("div")
    calculator.setAttribute("id", "calculator")

    createCalcDisplay(calculator)
    createCalcButtons(calculator)

    document.body.append(calculator)
}


createCalculator()