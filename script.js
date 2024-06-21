document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.calculator-screen');
    const keys = document.querySelector('.calculator-keys');

    let firstOperand = '';
    let secondOperand = '';
    let currentOperator = '';
    let shouldResetScreen = false;

    keys.addEventListener('click', event => {
        const { target } = event;
        const action = target.dataset.action;
        const value = target.dataset.value;

        if (!target.matches('button')) return;

        if (action === 'all-clear') {
            clear();
            updateDisplay();
        } else if (action === 'delete') {
            deleteLast();
            updateDisplay();
        } else if (action === 'calculate') {
            calculate();
            updateDisplay();
        } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            handleOperator(action);
            updateDisplay();
        } else if (value) {
            handleNumber(value);
            updateDisplay();
        }
    });

    function handleNumber(number) {
        if (shouldResetScreen) {
            display.value = number;
            shouldResetScreen = false;
        } else {
            display.value = display.value === '0' ? number : display.value + number;
        }
    }

    function handleOperator(operator) {
        const inputValue = parseFloat(display.value);

        if (currentOperator && shouldResetScreen) {
            currentOperator = operator;
            return;
        }

        if (firstOperand === '') {
            firstOperand = inputValue;
        } else if (currentOperator) {
            const result = operate(firstOperand, inputValue, currentOperator);
            display.value = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        shouldResetScreen = true;
        currentOperator = operator;
    }

    function operate(first, second, operator) {
        switch (operator) {
            case 'add':
                return first + second;
            case 'subtract':
                return first - second;
            case 'multiply':
                return first * second;
            case 'divide':
                return first / second;
            default:
                return second;
        }
    }

    function calculate() {
        if (currentOperator) {
            secondOperand = parseFloat(display.value);
            display.value = `${parseFloat(operate(firstOperand, secondOperand, currentOperator).toFixed(7))}`;
            firstOperand = display.value;
            secondOperand = '';
            currentOperator = '';
            shouldResetScreen = true;
        }
    }

    function clear() {
        display.value = '0';
        firstOperand = '';
        secondOperand = '';
        currentOperator = '';
        shouldResetScreen = false;
    }

    function deleteLast() {
        display.value = display.value.toString().slice(0, -1) || '0';
    }

    function updateDisplay() {
        display.value = display.value;
    }
});
