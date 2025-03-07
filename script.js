(() => {
    const expression = {
        leftOperand: null,
        operator: null,
        rightOperand: null,
    };

    const leftButtons = document.querySelector('.left-buttons');
    leftButtons.addEventListener('click', (e) => {
        if (e.target.matches('.operand')) {
            const digit = e.target.textContent;
            const displayValue = updateDisplay(digit);
        }
    });

    const rightButtons = document.querySelector('.right-buttons');
    rightButtons.addEventListener('click', (e) => {
        if (e.target.matches('.operator')) {
            expression.operator = e.target.textContent;
        }
    });
})();


function updateDisplay(number) {
    const display = document.querySelector('.display');
    const MAX_LENGTH = 9;

    if (display.textContent.length < MAX_LENGTH) {
        display.textContent += number;
    }

    return +display.textContent;
}


function operate(leftOperand, operator, rightOperand) {
    let operation;

    switch(operator) {
        case '+':
            operation = add;
            break;

        case '-':
            operation = subtract;
            break;

        case '*':
            operation = multiply;
            break;

        case '/':
            operation = divide;
            break;

        default:
            throw new Error('Incorrect or unsupported operator.')
    }

    return operation(leftOperand, rightOperand);
}


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a*b;
}


function divide(a, b) {
    return a/b;
}
