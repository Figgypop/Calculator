// Build functional logic

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {

  const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)

    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)

    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)

    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)

    }

    return result
  }


  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType


    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {

      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue &&
        operator &&
        previousKeyType !== 'operator'
      ) {

        display.textContent = calculate(firstValue, operator, secondValue)
      }

      key.classList.add('is-depressed')
      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action
      calculator.dataset.previousKeyType = 'operator'
      console.log('operator key!')
    }


    if (!action) {

      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent

      } else {

        display.textContent = displayedNum + keyContent
      }

      calculator.dataset.previousKeyType = 'number'
      console.log('number key!')
    }


    if (action === 'decimal') {

      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'

      } else if (previousKeyType === 'operator') {
        display.textContent = '0.'
      }

      calculator.dataset.previousKeyType = 'decimal'
      console.log('decimal key!')
    }


    if (action === 'clear') {
      display.textContent = '0'
      calculator.dataset.previousKeyType = 'clear'
      console.log('clear key!')
    }


    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      display.textContent = calculate(firstValue, operator, secondValue)
      calculator.dataset.previousKeyType = 'calculate'
      console.log('equal key!')
    }


    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  }
})
