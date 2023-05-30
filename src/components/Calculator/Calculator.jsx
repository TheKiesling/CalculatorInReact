import React, { useState, useEffect } from 'react'
import {
  Button,
  Display,
} from '@components'
import styles from './Calculator.module.css'

const Calculator = () => {
  const [display, setDisplay] = useState('')
  const [value, setValue] = useState('')
  const [firstValue, setFirstValue] = useState('')
  const [operator, setOperator] = useState('')
  const [lastAction, setLastAction] = useState('')

  const addNumber = (number) => {
    if (lastAction === 'operation') { setValue('') }
    setLastAction('number')
    setValue((prevValue) => prevValue + number)
  }

  const handleClickNumber = (number) => (value.length >= 9 || value === 'ERROR'
    ? null
    : addNumber(number))

  const handleClickDecimal = () => (value.includes('.') || value === 'ERROR'
    ? null
    : setValue((prevValue) => `${prevValue}.`))

  const handleClickClear = () => {
    setDisplay('')
    setValue('')
    setFirstValue('')
  }

  const handleClickPlusMinus = () => (value !== 'ERROR'
    ? setValue((prevValue) => {
      if (prevValue.startsWith('-')) return prevValue.substring(1)
      return `-${prevValue}`
    })
    : null)

  const handleClickDelete = () => (value !== 'ERROR' && lastAction !== 'operation'
    ? setValue((prevValue) => prevValue.slice(0, -1))
    : setValue(''))

  const calculateResult = (num1, num2, op) => {
    switch (op) {
      case '+':
        return num1 + num2
      case '-':
        return num1 - num2
      case '×':
        return num1 * num2
      case '÷':
        return num1 / num2
      case '%':
        return num1 % num2
      default:
        return 0
    }
  }

  const formatResult = (result) => {
    if (result < 0) {
      return 'ERROR'
    } if (result > 999999999) {
      return 'ERROR'
    }
    const decimalCount = (result.toString().split('.')[1] || '').length
    return decimalCount > 0 ? result.toFixed(Math.min(decimalCount, 9)) : result.toString()
  }

  const handleClickEquals = () => {
    setLastAction('operation')
    if (firstValue !== '' && operator !== '' && value !== '') {
      const result = calculateResult(parseFloat(firstValue), parseFloat(value), operator)
      const resultText = formatResult(result)
      setValue(resultText)
      setFirstValue('')
      setOperator('')
    }
  }

  const handleClickOperation = (op) => {
    setLastAction('operation')
    if (value !== 'ERROR') {
      if (firstValue !== '' && value !== '') {
        const result = calculateResult(parseFloat(firstValue), parseFloat(value), operator)
        const resultText = formatResult(result)
        setFirstValue(resultText)
        setValue(resultText)
        setOperator(op)
        return
      } if (value !== '') {
        setFirstValue(value)
      }
      setOperator(op)
    }
  }

  useEffect(() => {
    setDisplay(value.substring(0, 9))
  }, [value])

  return (
    <div className={`${styles.calculator}`}>
      <div className={`${styles.display}`}>
        <Display text={display} testId="display" />
      </div>
      <div className={`${styles.keyboard}`}>
        <Button text="%" type="operation" onClick={() => handleClickOperation('%')} />
        <Button text="±" type="operation" onClick={() => handleClickPlusMinus()} />
        <Button text="←" type="action" onClick={() => handleClickDelete()} />
        <Button text="C" type="action" onClick={() => handleClickClear()} />
        <Button text="7" type="number" onClick={() => handleClickNumber('7')} />
        <Button text="8" type="number" onClick={() => handleClickNumber('8')} />
        <Button text="9" type="number" onClick={() => handleClickNumber('9')} />
        <Button text="÷" type="operation" onClick={() => handleClickOperation('÷')} />
        <Button text="4" type="number" onClick={() => handleClickNumber('4')} />
        <Button text="5" type="number" onClick={() => handleClickNumber('5')} />
        <Button text="6" type="number" onClick={() => handleClickNumber('6')} />
        <Button text="×" type="operation" onClick={() => handleClickOperation('×')} />

        <Button text="1" type="number" onClick={() => handleClickNumber('1')} />
        <Button text="2" type="number" onClick={() => handleClickNumber('2')} />
        <Button text="3" type="number" onClick={() => handleClickNumber('3')} />
        <Button text="-" type="operation" onClick={() => handleClickOperation('-')} />
        <Button text="0" type="number" onClick={() => handleClickNumber('0')} />
        <Button text="." type="number" onClick={() => handleClickDecimal()} />
        <Button text="=" type="action" onClick={() => handleClickEquals()} />
        <Button text="+" type="operation" onClick={() => handleClickOperation('+')} />
      </div>
    </div>
  )
}

export default Calculator
