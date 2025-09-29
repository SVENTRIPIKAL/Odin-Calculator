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
function getButtonContainer(operatorList, section) {
    let container = document.createElement("div")
    let containerClass = (section == "end") ? "buttonContainerEnd" : "buttonContainer"
    container.setAttribute("class", containerClass)
    container.append(...operatorList)
    return container
}

// returns list with appended operator button
function getOperatorList(listSlice, i) {
    let operatorButton = (() => {
        switch (i) {
        case 9: return createButton("\u{000D7}")    // multiply
        case 6: return createButton("\u{02212}")    // subtract
        case 3: return createButton("\u{0002B}")    // add
        case "dv": return createButton("\u{000F7}") // divide
        case "eq": return createButton("\u{0003D}") // equals
        }
    })()
    listSlice.push(operatorButton)
    return listSlice
}

// returns an html button element with click listener
function createButton(n) {
    let button = document.createElement("button")
    let displayText = (n == "C") ? "|" : n
    button.addEventListener("click", () => {
        document.getElementById("display").textContent = displayText
    })
    button.textContent = n
    return button
}

// creates 3 rows of calculator buttons
function createMidSection(calculator) {
    let buttonList = Array.apply(null, Array(9)).map((e, i) => createButton(i+1))
    for (let i = 9; i > 0; i -= 3) {
        let listSlice = buttonList.slice(i-3, i)
        let operatorList = getOperatorList(listSlice, i)
        let buttonContainer = getButtonContainer(operatorList)
        calculator.append(buttonContainer)
    }
}

// displays 1 row of buttons
function createSection(calculator, buttonType, operator, section) {
    let buttonList = Array.apply(null, Array(1)).map((e, i) => createButton(buttonType))
    let operatorList = getOperatorList(buttonList, operator)
    let buttonContainer = getButtonContainer(operatorList, section)
    calculator.append(buttonContainer)
}

// displays 5 rows of containers with calculator buttons
function createCalcButtons(calculator) {
    createSection(calculator, "C", "dv")
    createMidSection(calculator)
    createSection(calculator, "0", "eq", "end")
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