import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default function AppPopup({ isActive, onClose, children}) {
  const close = (e) => {
    e.preventDefault();
    onClose();
  }
  return (
    <div className={ isActive ? "app-popup active" : "app-popup"}>
      <div className="box popup-box">
        <button className="btn btn-close" onClick={close}>&times;</button>
        { children }
      </div>
    </div>
  )
}

AppPopup.propTypes = {
  isActive: PropTypes.bool
}

AppPopup.defaultProps = {
  isActive: false
}
