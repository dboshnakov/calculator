let outputBox = document.querySelector('div.display-one');
outputBox.textContent = '';
let inputBox = document.querySelector('div.display-two');
inputBox.textContent = '0';
let allowedInput = new RegExp(/[^0-9\/\*\)\(\-\+\=\.\%| ]/gi);
let operators = new RegExp(/\/\*\)\(\-\+\=\.\%|/);
let buffer = [];
let output = '0';

function calcInput(input) {
    input = input.replace(/\s/g, '');
    //console.log(input);
    inputBox.textContent = '';
    if (input.match(allowedInput) ) {
        console.log("unexpected input");
        inputBox.textContent = "err";
    } else {
        //console.log(input);
        inputBox.textContent += input;
    }
}

function buttonClick(id) {
    //console.log(id);
    if (id === '=' || id === '+' || id === '-' || id === '/' || id === '*' || id === '%') {
        stageBuffer(id);
        //updateOutput(inputBox.textContent,id);
        inputBox.textContent = output;
        updateOutput(buffer);
        calculate(id);
    }  else if (id === 'CE') {
        clearEntry();
    } else if (id === 'C') {
        clearAll();
    } else if (id === 'bckspc') {
        backspace();
    } else if (inputBox.textContent === '0') {
        inputBox.textContent = id;
    } else {
        inputBox.textContent = id;
        //inputBox.textContent += id;
    }
}

function calculate(id) {
    //console.clear();
    console.log(buffer);
    if (buffer[2] !== undefined) {
        if (buffer[1] === '+') {
            output = addition(buffer[0],buffer[2]);
            console.log(output);
        } else if (buffer[1] === '-') {
            output = subtraction(buffer[0],buffer[2]);
            console.log(output);
        } else if (buffer[1] === '*') {
            output = multiplication(buffer[0],buffer[2]);
            console.log(output);
        } else if (buffer[1] === '/') {
            output = division(buffer[0],buffer[2]);
            console.log(output);
        } else if (buffer[1] === '=') {
            output = equals(buffer[0],buffer[2]);
            console.log(output);
        } else if (buffer[1] === '%') {
            output = percent(buffer[0],buffer[2]);
            console.log(output);
        }
        inputBox.textContent = output;
        updateOutput(buffer);
        buffer = [];
        stageBuffer(id);
        buffer.splice(0,3);
        //buffer.unshift(output);
        console.log(buffer);
        //updateOutput(buffer);
    }
}

function addition(a,b) {
    return Number(a)+Number(b);
}

function subtraction(a,b) {
    return Number(a)-Number(b);
}

function multiplication(a,b) {
    return Number(a)*Number(b);
}

function division(a,b) {
    return Number(a)/Number(b);
}

function equals(a,b) {
    return Number(b);
}

function percent(a,b) {
    return Number(a)*Number(b)/100;
}

function backspace() {
    inputBox.textContent = inputBox.textContent.slice(1,2);
}

function stageBuffer(id) {
    console.log("before", buffer);
    buffer.push(inputBox.textContent);
    buffer.push(id);
    console.log("after", buffer);
}

function updateOutput(buffer) {
    console.log("asd");
    console.log(buffer.length, buffer);
    outputBox.textContent = '';
    for (let i=0; i < buffer.length; i++) {
        console.log(buffer[i]);
        outputBox.textContent += buffer[i];
    }
    console.log("final output", outputBox.textContent);
    //outputBox.textContent = value;
    //outputBox.textContent += operator;
}

function clearEntry() {
    inputBox.textContent = '0';
}

function clearAll() {
    inputBox.textContent = '0';
    outputBox.textContent = '';
    output = '';
    buffer = [];
    console.clear();
}