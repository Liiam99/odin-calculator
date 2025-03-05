(() => {
    let leftOperand = null;
    let operator = null;
    let rightOperand = null;

    const expression = [leftOperand, operator, rightOperand];

    const display = document.querySelector('.display')

    const clearBtn = document.querySelector('.clear')
    clearBtn.addEventListener('click', () => display.textContent = '');

    setupOperatorButtons(expression);
})();


function setupOperatorButtons(expression) {
    const operatorBtns = document.querySelectorAll('.operator');
    operatorBtns.forEach((operatorBtn) => {
        operatorBtn.addEventListener('click', (e) => {
            expression[1] = e.target.textContent;
        });
    });
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
