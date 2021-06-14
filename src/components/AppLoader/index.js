import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default function AppLoader({ isActive, type }) {
  return (
    <div className={ isActive ? "app-loader "+type+" active" : "app-loader "+type}>
      Loading...
    </div>
  )
}

AppLoader.propTypes = {
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["screen", "block"])
}

AppLoader.defaultProps = {
  isActive: false,
  type: "screen"
}