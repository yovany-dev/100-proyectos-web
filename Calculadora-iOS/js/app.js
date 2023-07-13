import Calculator from "./calc.js";

const screen = document.getElementById('screen');
const buttons = document.getElementById('buttons');
const calc = new Calculator();

let num1 = null;
let num2 = null;
let operatorName = null;
let concatenate = false;


const activeButton = (btnPressed) => {
    const btnActive = document.querySelector('.btn-active');
    if (btnActive) {
        btnActive.classList.remove('btn-active');
        btnPressed.classList.add('btn-active');
    } else {
        btnPressed.classList.add('btn-active');
    }
}

const clear = () => {
    screen.textContent = '0';
    num1 = null;
    num2 = null;
    operatorName = null;

    const btnActive = document.querySelector('.btn-active');
    if (btnActive) {
        btnActive.classList.remove('btn-active');
    }
}

const calculate = () => {
    if (operatorName && num1 && num2) {
        const result = calc[operatorName](num1, num2);
        screen.textContent = result;
        
        // reset values
        num1 = result;
        num2 = null;
        operatorName = null;
        concatenate = true;
    }
}

const validation = (btnPressed, op) => {
    if (op === 'percentage' && operatorName === 'multiplication') {
        operatorName = 'percentage';
        calculate();
        return;
    }

    if (num1 !== null && num1 !== 0) {
        concatenate = true;
        calculate();
        activeButton(btnPressed);
        operatorName = op;
    }
}

const print = (num) => {
    const content = screen.textContent;
    if (content === '0') {
        screen.textContent = num;
    } else {
        if (num === '.' && content.includes('.') && !concatenate) {
            return;
        } else {
            screen.textContent += num;
        }
    }

    if (concatenate) {
        screen.textContent = num;
        concatenate = false;
    }
}

buttons.addEventListener('click', e => {
    const element = e.target;

    // number buttons
    if (element && element.matches('.num')) {
        const num = element.value;
        print(num);

        let content = null;
        if (screen.textContent !== '.') {
            content = parseFloat(screen.textContent);
        }

        if (operatorName) {
            const btnActive = document.querySelector('.btn-active');
            if (btnActive) {
                btnActive.classList.remove('btn-active');
            }
            num2 = content;

        } else {
            num1 = content;
        }
    }

    // arithmetic operators
    if (element && element.matches('.btn')) {
        const op = element.value;

        if (op === 'clear') {
            clear();
        } else if (op === 'calculate') {
            calculate();
        } else {
            validation(element, op);
        }
    }
});