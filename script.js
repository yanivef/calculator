const display = document.querySelector('.screen')
const digits = document.querySelectorAll('.digit')
const digitsArr = Array.from(digits) // transfer from NodeList to Array
const operations = document.querySelectorAll('.operation')
const operationsArr =  Array.from(operations) // transfer from NodeList to Array
const clear = document.querySelector('.clear')
const equal = document.querySelector('.equal')
const calculationObj = {}


clear.addEventListener('click', clearDisplay)

digitsArr.forEach(digit => digit.addEventListener('click', () => {
    if(calculationObj.result !== undefined && calculationObj.num1 === undefined)
        return
    if(display.textContent.length > 50) {
        alert('Too many digits! overflow exception')
        return clearDisplay()
    }

    display.textContent += digit.textContent

    if (calculationObj.opr === undefined)
        calculationObj.num1 = concat(calculationObj.num1, digit)
    else 
        calculationObj.num2 = concat(calculationObj.num2, digit)         
}))

operationsArr.forEach(operation => operation.addEventListener('click', () => {
    if(calculationObj.result !== undefined) {
        calculationObj.num1 = calculationObj.result
    }
    if(calculationObj.num1 === undefined || calculationObj.opr !== undefined)
        return

    calculationObj.opr = operation.textContent
    display.textContent += ` ${operation.textContent} `  
}))


equal.addEventListener('click', () => {
    if(calculationObj.num2 === undefined)
        return
    
    if(operate(calculationObj) === 'MATH ERROR')
        display.textContent = 'MATH ERROR'
    else {
        display.textContent = `${calculationObj.num1} ${calculationObj.opr} ${calculationObj.num2} = ${operate(calculationObj)}`
        calculationObj.result = operate(calculationObj)      
    }
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
    return !num2 ? 'MATH ERROR' : num1/num2 // attempt to divide by zero
}

function multiply(num1,num2){
    return num1*num2
}

function concat(num, dig) { 
    num += `${dig.textContent}`
    return num = num.replace('undefined', '')
}

function clearDisplay(){
    display.textContent = ''
    calculationObj.result = undefined
    resetObj()
}