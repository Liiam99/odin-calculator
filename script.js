(() => {
    const expression = {
        leftOperand: 0,
        operator: null,
        rightOperand: null,
    };

    // Initial value.
    updateDisplay(expression.leftOperand);

    const leftButtons = document.querySelector('.left-buttons');
    leftButtons.addEventListener('click', (e) => {
        if (e.target.matches('.operand')) {
            // "Switches" the display input to the right operand.
            if ((expression.operator && expression.rightOperand === null)) {
                clearDisplay();

                // Equal sign should not be saved in the expression.
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
            // Evaluates expression.
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

        // Clears calculator.
        if (e.target.matches('.clear')) {
            expression.leftOperand = 0;
            expression.operator = null;
            expression.rightOperand = null;
            clearDisplay();
            updateDisplay(expression.leftOperand);
        }
    });
})();


function updateDisplay(content) {
    if (typeof content === 'number') {
        content = content.toString();
    }

    const display = document.querySelector('.display');

    if (!isFinite(content)) {
        display.textContent = 'no no no';

        return 0;
    }

    // Prevents consecutive sole zero inputs.
    if (display.textContent === '0' && content !== '.') {
        display.textContent = content;

        return +display.textContent;
    }

    const MAX_VALUE = 999999999;
    const MAX_LENGTH = MAX_VALUE.toString().length;
    let newDisplayContent = display.textContent + content;

    if (newDisplayContent.length > MAX_LENGTH && content.length === 1) {
        newDisplayContent = display.textContent;
    } else {
        // Prevents overflow in case of large numbers or long decimals.
        if (+newDisplayContent > Number.MAX_SAFE_INTEGER ||
            +newDisplayContent < Number.MIN_SAFE_INTEGER) {
            newDisplayContent = NaN;
        } else if (+newDisplayContent > MAX_VALUE ||
                   +newDisplayContent < -MAX_VALUE/10) {
            newDisplayContent = (+newDisplayContent).toExponential(MAX_LENGTH - 6);
        } else if (newDisplayContent.includes('.')) {
            newDisplayContent = formatFloatString(content, MAX_LENGTH);
        }
    }

    display.textContent = newDisplayContent;

    return +display.textContent;
}


function formatFloatString(floatString, maxLength) {
    const dotPos = floatString.indexOf('.') + 1;
    const fracLength = maxLength - dotPos;

    return (+floatString).toFixed(fracLength);
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
