let outputBox = document.querySelector('div.display-one');
outputBox.textContent = '';
let inputBox = document.querySelector('div.display-two');
inputBox.textContent = '';
let allowedInput = new RegExp(/[^0-9\/\*\)\(\-\+\=\.\%| ]/gi);
let operators = new RegExp(/\/\*\)\(\-\+\=\.\%|/);
let buffer = [];

function calcInput(input) {
    input = input.replace(/\s/g, '');
    console.log(input);
    inputBox.textContent = '';
    if (input.match(allowedInput) ) {
        console.log("unexpected input");
        inputBox.textContent = "err";
    } else {
        console.log(input);
        inputBox.textContent += input;
    }
}

function buttonClick(id) {
    console.log(id);
    if (id === '=' || id === '+' || id === '-' || id === '/' || id === '*' || id === '.' || id === '%') {
        calculate(id);
        updateOutput(id, inputBox.textContent);
        inputBox.textContent = '';
    } else {
        inputBox.textContent += id;
    }
}

function clearEntry() {
    inputBox.textContent = '';
}

function clearAll() {
    inputBox.textContent = '';
    outputBox.textContent = '';
}

function backspace() {
    inputBox.textContent.slice(0,-1);
}

function calculate(id) {
    buffer.push(inputBox.textContent);
    buffer.push(id);
    console.log(buffer);
}

function updateOutput(operator, value) {
    outputBox.textContent += " ";
    outputBox.textContent += value;
    outputBox.textContent += " ";
    outputBox.textContent += operator;
}