import React from 'react'
import './style.scss'

export default function AppHeader({ title }) {
  return (
    <div className="app-header">
      <h1>{ title }</h1>
    </div>
  )
}
