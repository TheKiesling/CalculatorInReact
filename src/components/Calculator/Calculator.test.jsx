import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Calculator from './Calculator'

describe('Calculator', () => {
  it('should perform addition correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />)

    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('+'))
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('='))

    expect(getByTestId('display').value).toBe('4')
  })

  it('should print error with negatives', () => {
    const { getByText, getByTestId } = render(<Calculator />)

    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('-'))
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('='))

    expect(getByTestId('display').value).toBe('ERROR')
  })

  it('should addmit only 9 characters', () => {
    const { getByText, getByTestId } = render(<Calculator />)

    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('1'))

    expect(getByTestId('display').value).toBe('111111111')
  })

  it('should addmit only 9 characters as result', () => {
    const { getByText, getByTestId } = render(<Calculator />)

    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('+'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('='))

    expect(getByTestId('display').value).toBe('ERROR')
  })

  it('should perform module correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />)

    fireEvent.click(getByText('9'))
    fireEvent.click(getByText('%'))
    fireEvent.click(getByText('7'))
    fireEvent.click(getByText('='))

    expect(getByTestId('display').value).toBe('2')
  })
})
