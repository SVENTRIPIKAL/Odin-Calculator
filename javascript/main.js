// global variables
let a = null
let op = null
let displayTotal = ""


// CALCULATION FUNCTIONS

// adds two numbers
function add(a, b) { return a + b }

// subtracts two numbers
function subtract(a, b) { return a - b }

// multiplies two numbers
function multiply(a, b) { return a * b }

// divides two numbers, if possible
function divide(a, b) {
    return (() => {
        switch (b) {
            case 0: return "Can't Divide By 0";
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

// resets the global variables
function clearConsole() {
    a = null
    op = null
    displayTotal = ""
}

// returns the total having applied operation to variables
function operate() {
    if (a != null && op != null && displayTotal != "") {
        let temp = op(a, parseInt(displayTotal))
        clearConsole()
        if (!isNaN(temp)) { a = temp }
        return temp
    }
    else { return document.getElementById("display").textContent }
}

// returns the total having applied opertation to variables
function getTotal(func) {
    if (displayTotal == "") {
        if (a != null) { op = func }
        return document.getElementById("display").textContent
    } 
    else {
        if (op == null) { a = parseInt(displayTotal) }
        else { a = op(a, parseInt(displayTotal)) }
        op = func
        displayTotal = ""
        return a
    }
}

// returns text to be displayed on screen
function getDisplayText(n) {
    return (() => {
        switch (n) {
            case "C": {
                clearConsole()
                return "|"
            }
            case "\u{000D7}": return getTotal(multiply) // multiply
            case "\u{02212}": return getTotal(subtract) // subtract
            case "\u{0002B}": return getTotal(add)      // add
            case "\u{000F7}": return getTotal(divide)   // divide
            case "\u{0003D}": return operate()          // equals
            default: return (displayTotal += n)
        }
    })()
}

// returns an html button element with click listener
function createButton(n) {
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        let displayText = getDisplayText(n)
        document.getElementById("display").textContent = displayText
    })
    button.textContent = n
    return button
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