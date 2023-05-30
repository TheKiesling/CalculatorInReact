import React from 'react'
import PropTypes from 'prop-types'
import styles from './Display.module.css'

const Display = ({ text, testId }) => (
  <input
    value={text}
    className={`${text === 'ERROR' ? styles.error : styles.display}`}
    data-testid={testId}
    readOnly
  />
)

Display.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
}

export default Display
