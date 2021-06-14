import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default function AppAlert({ isActive, type, message}) {
  return (
    <div className={ isActive ? "app-alert active" : "app-alert"}>
      <div className={"app-alert-message "+type}>
        { message }
      </div>
    </div>
  )
}

AppAlert.propTypes = {
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["success", "warning", "error"]),
  message: PropTypes.string
}

AppAlert.defaultProps = {
  isActive: false,
  type: "success"
}
