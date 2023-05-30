import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = ({
  text,
  onClick,
  type,
  testId,
}) => (
  <button
    className={`${styles.button} ${styles[type]}`}
    type="button"
    onClick={() => onClick()}
    data-testid={testId}
  >
    <span>{text}</span>
  </button>
)

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
}
export default Button
