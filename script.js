const display = document.querySelector('.screen')
const digits = document.querySelectorAll('.digit')
const digitsArr = Array.from(digits) // transfer from NodeList to Array
const operations = document.querySelectorAll('.operation')
const operationsArr =  Array.from(operations) // transfer from NodeList to Array
const clear = document.querySelector('.clear')
const equal = document.querySelector('.equal')
const calculationObj = {}


clear.addEventListener('click', () => {
    display.textContent = ''
    resetObj()
})

digitsArr.forEach(digit => digit.addEventListener('click', () => {
    if(calculationObj.num1 === undefined)
        display.textContent = ''
    display.textContent += digit.textContent
    display.textContent = display.textContent.replace(/[+-/\*\*/]/, '')
    if (calculationObj.opr === undefined){
        calculationObj.num1 += digit.textContent // converting to Number type
        calculationObj.num1 = calculationObj.num1.replace('undefined', '')
    }
    
    else {
        calculationObj.num2 += digit.textContent
        calculationObj.num2 = calculationObj.num2.replace('undefined', '')
    } 
}))

operationsArr.forEach(operation => operation.addEventListener('click', () => {
    if(calculationObj.num1 === undefined)
        return
    if(calculationObj.opr !== undefined)
        display.textContent = 'ERROR - ONE OPERATOR AT A TIME'
    else {
        calculationObj.opr = operation.textContent
        display.textContent = operation.textContent
    }
}))


equal.addEventListener('click', () => {
    if(calculationObj.num2 === undefined)
        return
    
    if(operate(calculationObj) === 'MATH ERROR')
        display.textContent = 'MATH ERROR'
    else 
        display.textContent = `${calculationObj.num1} ${calculationObj.opr} ${calculationObj.num2} = ${operate(calculationObj)}`
    resetObj()
})


function resetObj () {
    calculationObj.num1 = undefined // reset
    calculationObj.opr = undefined // reset
    calculationObj.num2 = undefined // reset
}


function operate(obj) {
    switch(obj.opr) {
        case('+'):
            return add(+obj.num1,+obj.num2)
        case('-'):
            return subtract(+obj.num1,+obj.num2)
        case('*'):
            return multiply(+obj.num1,+obj.num2)
        case('/'):
            return divide(+obj.num1,+obj.num2)
            
    }
}


function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
} 

function divide(num1, num2) {
    if(!num2)
        return 'MATH ERROR' // attempt to divide by zero
    return num1/num2
}

function multiply(num1,num2){
    return num1*num2
}