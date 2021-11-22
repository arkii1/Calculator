let zeroButton = document.getElementById('zero-button');
let oneButton = document.getElementById('one-button');
let twoButton = document.getElementById('two-button');
let threeButton = document.getElementById('three-button');
let fourButton = document.getElementById('four-button');
let fiveButton = document.getElementById('five-button');
let sixButton = document.getElementById('six-button');
let sevenButton = document.getElementById('seven-button');
let eightButton = document.getElementById('eight-button');
let nineButton = document.getElementById('nine-button');
let clearButton = document.getElementById('clear-button');
let modButton = document.getElementById('mod-button');
let backspaceButton = document.getElementById('backspace-button');
let powerButton = document.getElementById('power-button');
let divideButton = document.getElementById('divide-button');
let addButton = document.getElementById('plus-button');
let minusButton = document.getElementById('minus-button');
let decimalButton = document.getElementById('decimal-button');
let equalsButton = document.getElementById('equals-button');
let multiplyButton = document.getElementById('multiply-button');

let screenText = document.getElementById('screen-text');

zeroButton.onclick = () => addElement(0);
oneButton.onclick = () => addElement(1);
twoButton.onclick = () => addElement(2);
threeButton.onclick = () => addElement(3);
fourButton.onclick = () => addElement(4);
fiveButton.onclick = () => addElement(5);
sixButton.onclick = () => addElement(6);
sevenButton.onclick = () => addElement(7);
eightButton.onclick = () => addElement(8);
nineButton.onclick = () => addElement(9);

divideButton.onclick = () => addElement(operations.DIVIDE);
multiplyButton.onclick = () => addElement(operations.MULTIPLY);
addButton.onclick = () => addElement(operations.ADD);
minusButton.onclick = () => addElement(operations.MINUS);
decimalButton.onclick = () => addElement(operations.DECIMAL);
modButton.onclick = () => addElement(operations.MODULUS);
powerButton.onclick = () => addElement(operations.POWER);

equalsButton.onclick = () => calculateAnswer();
clearButton.onclick = () => clearAllElements();
backspaceButton.onclick = () => deleteLastElement();

const operations = {
    ADD: "+",
    MINUS: "-",
    DIVIDE: "/",
    MULTIPLY: "*",
    DECIMAL: ".",
    POWER: "^",
    MODULUS: "%",
}

if(screenText == null)
    console.log("screen test is null");

let operationArray = [];
let lastEntryIsNumber = false;

function deleteLastElement(){
    let element = operationArray[operationArray.length - 1];
    if(!isNumber(element)){
        operationArray.splice(operationArray.length - 1, 1);
    }
    else if(element < 10 && element > -10)
    {
        operationArray.splice(operationArray.length - 1, 1);
    }
    else{
        let newValue = "" + element;
        newValue = newValue.slice(0, -1);
        operationArray[operationArray.length - 1] = parseFloat(newValue);
    }

    lastEntryIsNumber = isNumber(operationArray.length - 1) && operationArray.length > 0;
    updateText();
    console.log(operationArray);
}

function updateText(){
    let str = "";
    operationArray.forEach(element => {
        str += ("" + element);
    });
    screenText.innerHTML = str == "" ? "0" : str;
}

function clearAllElements(){
    operationArray = [];
    lastEntryIsNumber = false;
    updateText();
}

function addElement(element)
{
    if(operationArray.length > 6)
        return;

    if(lastEntryIsNumber && isNumber(element)) {
        operationArray[operationArray.length - 1] = concatenateNumbers(operationArray[operationArray.length - 1], element);
        lastEntryIsNumber = true;
    }
    else {
        operationArray.push(element);
        lastEntryIsNumber = isNumber(element);
    }
    console.log(operationArray);
    updateText();
} 

function convertToDecimal(a, b){
    let str = a + "." + b;
    return parseFloat(str, 10);
}

function concatenateNumbers(a, b) {
    let str = "" +  a + b;
    return parseFloat(str, 10);
}

function isNumber(element){
    return !isNaN(element) || typeof(0) === typeof(element);
}

function calculateAnswer()
{
    var decimalIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.DECIMAL){
            acc.push(index);
        }
        return acc;        
    }, []);

    decimalIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = convertToDecimal(a, b);

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });

    var powerIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.POWER){
            acc.push(index);
        }
        return acc;        
    }, []);

    powerIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = a ** b;

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });

    var divideIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.DIVIDE){
            acc.push(index);
        }
        return acc;        
    }, []);

    divideIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = a / b;

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });

    var multIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.MULTIPLY){
            acc.push(index);
        }
        return acc;        
    }, []);

    multIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = a * b;

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });

    var minusIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.MINUS){
            acc.push(index);
        }
        return acc;        
    }, []);

    minusIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = a - b;

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });

    var addIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.ADD){
            acc.push(index);
        }
        return acc;        
    }, []);

    addIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = a + b;

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });

    var modIndicies = operationArray.reduce((acc, curr, index) => {
        if(curr === operations.MODULUS){
            acc.push(index);
        }
        return acc;        
    }, []);

    modIndicies.forEach(element => {
        var a = operationArray[element - 1]; 
        var b = operationArray[element + 1];
        const newValue = a % b;

        operationArray[element - 1] = newValue;
        operationArray.splice(element, 2);
    });


    if(operationArray.length > 1){
        console.log("operationsArray length is greater than 1");
    }
    else{
        console.log("Answer: " + operationArray[0]);
    }

    updateText();
}