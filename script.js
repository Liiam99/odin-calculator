(() => {
    const leftOperand = null;
    const operator = null;
    const rightOperand = null;

    const clearBtn = document.querySelector('.clear')
    const display = document.querySelector('.display')
    clearBtn = clearBtn.addEventListener('click', () => display.textContent = '');
})();


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
