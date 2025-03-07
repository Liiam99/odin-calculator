(() => {
    const expression = {
        leftOperand: null,
        operator: null,
        rightOperand: null,
    };

    const leftButtons = document.querySelector('.left-buttons');
    leftButtons.addEventListener('click', (e) => {
        if (e.target.matches('.operand')) {
            if ((expression.operator && expression.rightOperand === null)) {
                clearDisplay();

                if (expression.operator === '=') {
                    expression.operator = null;
                }
            }

            const digit = e.target.textContent;
            const displayValue = updateDisplay(digit);

            if (expression.operator) {
                expression.rightOperand = displayValue;
            } else {
                expression.leftOperand = displayValue;
            }
        }
    });

    const rightButtons = document.querySelector('.right-buttons');
    rightButtons.addEventListener('click', (e) => {
        if (e.target.matches('.operator')) {
            if (expression.leftOperand !== null &&
                expression.operator !== null &&
                expression.rightOperand !== null) {
                const result = operate(...Object.values(expression));
                clearDisplay();
                const displayValue = updateDisplay(result);

                expression.leftOperand = displayValue;
                expression.rightOperand = null;

                if (e.target.matches('.equal')) {
                    expression.operator = '=';
                }
            }

            if (!e.target.matches('.equal')) {
                expression.operator = e.target.textContent;
            }
        }
    });
})();


function updateDisplay(value) {
    const display = document.querySelector('.display');
    const MAX_LENGTH = 9;

    if (display.textContent === '0' && value !== '.') {
        display.textContent = value;

        return value;
    }

    if (display.textContent.length < MAX_LENGTH) {
        display.textContent += value;
    }

    return +display.textContent;
}


function clearDisplay() {
    const display = document.querySelector('.display');
    display.textContent = '';
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
