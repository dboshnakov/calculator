const allowedInput = new RegExp(/^[\d|\/|\*|\-|\+|\=|\.|\%]$/);
const digits = new RegExp(/^[\d]*$/i);
const operators = new RegExp(/^[\/\*\-\+\=]$/);

let currentInput = '';
let userInput = '';
let calcQueue = [];

//3. handling of user input 
function isInputAllowed(input) {
    if (allowedInput.test(input)) {
        return true;
    } 
    return false;
}
//Four possible cases:
//1 - calcQueue is empty AND userInput is empty
//2 - calcQueue is empty AND userInput is NOT empty
//3 - calcQueue is NOT empty AND userInput is empty
//4 - calcQueue is NOT empty and userInput is NOT empty

//check input type - digit, decimal point, percent, math operator:
function handleUserInput(input) {
    if (!isInputAllowed(input)) {
        return "Error: Input character not allowed"
    } 
    //console.log('input:',input, " uI:",userInput, " cQ",calcQueue);
    //if userInput is empty
    if (userInput === '') {
        //check if input is math operator
        if (classifyInput(input) === 'operator') {
            //if the last item in calcQueue is a math operator, replace it
            if (calcQueue.length > 1 && classifyInput(calcQueue[calcQueue.length-1]) === 'operator') {
                removeLastCQ();
                pushToCalcQueue(input);
            } else if (calcQueue.length === 1) {
                pushToCalcQueue(input);
            }
        //if input is different from %, concatenate it to userInput
        } else if (input !== '%') {
            userInput += input;
        } else if (input === '%' && calcQueue.length === 1) {
            calcQueue[0] = calcQueue[0]+input;
        }
    //if userInput is not empty
    } else {
        if (classifyInput(userInput) === 'digits') {
            if (classifyInput(input) === 'operator') {
                if (calcQueue.length === 1) {
                    removeLastCQ();
                }
                pushToCalcQueue(userInput);
                clearUserInput();
                pushToCalcQueue(input);
            } else {
                userInput += input;
            }
        } else if (classifyInput(userInput) === 'only decimal') {
            if (classifyInput(input) === 'digits') {
                userInput += input;
            } 
        } else if (classifyInput(userInput) === 'digits ending on percent(s)') {
            if (classifyInput(input) === 'digits') {
                if (calcQueue.length === 1) {
                    removeLastCQ();
                }
                pushToCalcQueue(userInput);
                pushToCalcQueue('*');
                userInput = input;
            } else if (input === '%') {
                userInput += input;
            } else if (classifyInput(input) === 'operator') {
                if (calcQueue.length === 1) {
                    removeLastCQ();
                }
                pushToCalcQueue(userInput);
                clearUserInput();
                pushToCalcQueue(input);
            }
        } else if (classifyInput(userInput) === 'digits ending on decimal') {
            if (classifyInput(input) === 'digits') {
                userInput += input;
            } else if (input === '%') {
                removeLastString(userInput);
                userInput += input;
            } else if (classifyInput(input) === 'operator') {
                if (calcQueue.length === 1) {
                    removeLastCQ();
                }
                removeLastString(userInput);
                pushToCalcQueue(userInput);
                clearUserInput();
                pushToCalcQueue(input);
            }
        } else if (classifyInput(userInput) === 'digits with decimal inbetween') {
            if (classifyInput(input) === 'digits' || input === '%') {
                userInput += input;
            } else if (classifyInput(input) === 'operator') {
                if (calcQueue.length === 1) {
                    removeLastCQ();
                }
                pushToCalcQueue(userInput);
                clearUserInput();
                pushToCalcQueue(input);
            }
        }
    }
    //console.log('uI: ',userInput);
    //console.log('cQ: ',calcQueue);
}

function clearUserInput() {
    userInput = '';
} 

function removeLastString(a) {
    return a = a.slice(0,-1);
}

function removeLastCQ() {
    calcQueue.pop();
}

function removeFirstCQ() {
    calcQueue.shift();
}

function addFirstCQ(a) {
    calcQueue.unshift(a);
}

function pushToCalcQueue(input) {
    calcQueue.push(input);
    if (calcQueue.length > 3) {
        callMath();
    }
}

function classifyInput(input) {
    //console.log(input);
    if (digits.test(input)) {
        return 'digits';
    }  else if (/^\.$/.test(input)) {
        return 'only decimal';
    } else if (/^[\d]+\.[\d]+$/.test(input)) {
        return 'digits with decimal inbetween';
    } else if (/^[\d]+\.$/.test(input)) {
        return 'digits ending on decimal';
    } else if (/^[\d]+\.?[\d]+\%+/.test(input)) {
        return 'digits ending on percent(s)';
    } else if (operators.test(input)) {
        return 'operator'
    }
}

let result = '';

//calculation processing
function calculate(a,b,operator) {
    //check what the 2nd element in calcQueue is and call the relevant function
    switch (operator) {
        case '+':
            console.log('plus');
            result = mathAdd(a,b);
            break;
        case '-':
            console.log('minus');
            result = mathMinus(a,b);
            break;
        case '*':
            console.log('multiply');
            result = mathMultiply(a,b);
            break;
        case '/':
            console.log('divide');
            result = mathDivide(a,b);
            break;
        default:
            console.log('unexpected operator');
    }
    removeFirstCQ();
    removeFirstCQ();
    removeFirstCQ();
    addFirstCQ(result);
    if (calcQueue[1] === '=') {
        removeLastCQ();
    }
    console.log(calcQueue);
}

function callMath() {
    //check if the 1st number ends on a % and handle it
    if (calcQueue[0].charAt(calcQueue[0].length-1) === '%') {
        handlePercent(calcQueue[0]);
    }
    calculate(calcQueue[0],calcQueue[2],calcQueue[1]);
}

//test.substring(0,test.indexOf('%'))/100+(test.substring(test.indexOf('%')+1));
function handlePercent(a) {
    console.log('before start: ',a);
    a = removeLastString(a);
    console.log('after last char rem: ',a);
    if (a.indexOf('%') === -1) {
        a = a/100;
    }
    console.log('after /100: ',a);
    if (a.indexOf('%') != -1) {
        a = a.substring(0,a.indexOf('%'))/100+(a.substring(a.indexOf('%')+1));
        handlePercent(a);
    }
    
    return a;
}


function mathAdd(a,b) {
    return Number(a) + Number(b);
}

function mathMinus(a,b) {
    return Number(a) - Number(b);
}

function mathMultiply(a,b) {
    return Number(a) * Number(b);
}

function mathDivide(a,b) {
    return Number(a) / Number(b);
}

